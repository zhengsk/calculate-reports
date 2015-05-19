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
        }else{
            alert(rep.message)
        }
    })
    .fail(function() {
        alert('加载出错！');
    })
    .always(function(){
        LoadingTip.hide();
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

// 加载提示
LoadingTip = {
    show : function (content, autoHide) {
        var _this = this;
        if(!this.created){
            this.created = true;
            var ele = document.createElement("span");
            ele.innerText = content ||"加载中...";
            ele.style.cssText = "position: absolute; color:#FFF; z-index: 10000; border-radius:5px; top:50%; left:50%; margin:-40px 0 0 -40px; width:80px; height:80px; text-align:center; line-height:80px; background-color:rgba(0,0,0,0.8);"
            document.body.appendChild(ele);
            this.ele = ele;
        }else{
            this.ele.innerText = content ||"加载中...";
            this.ele.style.display = "block";
        }
        if(autoHide){
            setTimeout(function(){_this.hide()}, autoHide);
        };
    },
    hide : function () {
        $(this.ele).stop(true,true).fadeOut(400);
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

