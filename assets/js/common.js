
/*
 * 通用的Ajax调用方法
 */
function doAjax (options, callBack) {

    LoadingTip.show();

    var defaultOptions = {
        type : "GET"
        ,dataType : "json"
        ,data: {access_token: 'OIUE-ECNE-CHEO-BIUL'}
    }

    callBack = callBack || options.callBack || jQuery.noop();

    options = $.extend(true, defaultOptions, options);

    $.support.cors = true;
    
    $.ajax(options)
    .done(function(rep) {
        if(rep.status === 200){
            callBack.call(options, rep.datas);
            LoadingTip.hide();
            return;
        }
        LoadingTip.show(rep.message, 1500);
    })
    .fail(function() {
        alert('加载出错！');
        LoadingTip.show('加载出错！', 1500);
    });
}

// 页面跳转
function gotoPage (url, params){
    var params = params ? ( "?" +  jQuery.param(params) ) : '';
    window.location.href = url + params;
}

// 设置下拉列表
function setSelect(selectId, datas, defaultId, changeFun){
    var $select = $("#" + selectId);
    $select[0].length = 0;
    for(var i = 0, j = datas.length; i < j; i++){
        if(datas[i].id === defaultId){
            $select.append("<option value='" + datas[i].id + "' selected='selected'>" + datas[i].name + "</option>");
        }else{
            $select.append("<option value='" + datas[i].id + "'>" + datas[i].name + "</option>");
        }
    }
    if(changeFun){
        $select.off('change').on('change', function(){
            changeFun.call(this, this.value);
        });
    }
}

// 设置年份选择下拉
function initYearSelect (selectId, minYear, maxYear) {
    var datas = [];
    for(var i = minYear, j = maxYear; i <= j; i++){
        datas.push({id : i, name : i + '年'});
    }
    setSelect(selectId, datas)
}

// 加载提示
LoadingTip = {
    show : function (content, autoHide) {
        var _this = this;
        if(!this.created){
            this.created = true;
            var wrapper = document.createElement("div");
            wrapper.className = "loadingTipWrapper"
            var ele = document.createElement("span");
            ele.innerText = content ||"加载中...";
            ele.className = "loadingTip";

            wrapper.appendChild(ele);
            document.body.appendChild(wrapper);
            this.wrapper = wrapper;
            this.ele = ele;
        }else{
            this.ele.innerText = content ||"加载中...";
            this.wrapper.style.display = "block";
            this.shown = true;
        }
        if(autoHide){
            setTimeout(function(){_this.hide()}, autoHide);
        };
    },
    hide : function () {
        $(this.wrapper).stop(true,true).fadeOut(400);
        this.shown = false;
    }
}

// 底部导航条
function initNavigatorBar(){
    historyGo('#historyBack', -1); // 后退
    historyGo('#historyForward', 1); // 前进
    touchEndFun($('#goToHome'), function(){ // 首页
        window.location.href = 'index.html';
    });
}

//历史记录跳转
function historyGo (ele, num) {
    touchEndFun($(ele), function(){
        window.history.go(num || -1);
    });
}

//手触结束事件
function touchEndFun ($ele, fun) {
    var param = Array.prototype.slice.call(arguments, 2);
    $ele.on('touchend', function(){
        fun.apply(this, param);
    });
}

// 查询字符串转为对象
function queryParamsToObj(searchString) {
    var searchString = searchString || window.location.search;
    var search = searchString.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/); //提取location.search中'?'后面的部分
    if (!search) {
        return {};
    }
    var searchStr = search[1];
    var searchHash = searchStr.split('&');

    var ret = {};
    for (var i = 0, len = searchHash.length; i < len; i++) { //这里可以调用each方法
        var pair = searchHash[i];
        if ((pair = pair.split('='))[0]) {
            var key = decodeURIComponent(pair.shift());
            var value = pair.length > 1 ? pair.join('=') : pair[0];

            if (value != undefined) {
                value = decodeURIComponent(value);
            }
            if (key in ret) {
                if (ret[key].constructor != Array) {
                    ret[key] = [ret[key]];
                }
                ret[key].push(value);
            } else {
                ret[key] = value;
            }
        }
    }
    return ret;
}


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//+--------------------------------------------------- 
//| 日期计算 
//+--------------------------------------------------- 
Date.prototype.DateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's':
            return new Date(Date.parse(dtTmp) + (1000 * Number));
            break;
        case 'n':
            return new Date(Date.parse(dtTmp) + (60000 * Number));
            break;
        case 'h':
            return new Date(Date.parse(dtTmp) + (3600000 * Number));
            break;
        case 'd':
            return new Date(Date.parse(dtTmp) + (86400000 * Number));
            break;
        case 'w':
            return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
            break;
        case 'q':
            return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            break;
        case 'm':
            return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            break;
        case 'y':
            return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            break;
    }
}


var CONSTANT = {
    IP_PATH : "http://120.42.54.162:80"
    ,TODAY : (new Date()).Format("yyyy-MM-dd")
    ,YEAR : (new Date()).Format("yyyy")
    ,YESTODAY : (new Date((new Date()).getTime()-24*60*60*1000)).Format("yyyy-MM-dd")
    ,TOMORROW : (new Date((new Date()).getTime()+24*60*60*1000)).Format("yyyy-MM-dd")
}