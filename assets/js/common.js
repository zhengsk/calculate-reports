/*
 * 通用的Ajax调用方法
 */
function doAjax (options, callBack) {

    LoadingTip.show();

    var defaultOptions = {
        type : "GET"
        ,dataType : "json"
    }

    callBack = callBack || options.callBack || jQuery.noop();

    options = $.extend(defaultOptions, options);

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

//历史记录跳转
function historyGo (ele, num) {
    $(ele).on('touchend', function(){
        window.history.go(num || -1);
    });
}
