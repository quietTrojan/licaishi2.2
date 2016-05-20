/**
 * 展示加载状态
 * @param tipText 加载的文案提示，如果没有，则采用默认文案
 */
function showLoading(tipText){
    var htmlStr='<div class="loadingBox" id="loadingBox"><div class="inner"><i class="icon"></i><p class="tip_p"></p></div></div>';
    var loadingBox=$('#loadingBox');
    if(loadingBox.size()==0){
        loadingBox=$(htmlStr).appendTo($(document.body));
    }
    if(typeof tipText == "undefined"){
        tipText="正在请求数据…";
    }
    loadingBox.find('.tip_p').text(tipText);
    loadingBox.show();
}
/**
 * 隐藏加载状态
 */
function hideLoading(){
    $('#loadingBox').hide();
}
/**
 * 提示弹窗
 * @constructor
 */
function TipPop(){
    this.maskDiv=null;
    this.popDiv=null;
    this.options=null;
}
TipPop.prototype={
    "defaultParJson":{
        "type":"alert",
        "isHtml":false,
        'htmlStr':'弹层文案提示，可能为html代码片段'
        /*'okCallBack':function(){
            this.
        }*/
    },
    "createPop":function(parJson){
        this.options=$({},this.defaultParJson,parJson);
        this.popDiv=$('<div class="confirmPop"><div class="tipCont"><p class="reuse_tip"><span>验证码获取成功!</span></p></div><div class="btnBox"><input type="button"value="确认"class="okBtn"/></div></div>');
    },
    "show":function(){
        this.maskDiv.show();
        this.popDiv.show();
    },
    "hide":function(){
        this.maskDiv.hide();
        this.popDiv.hide();
    },
    'createDom':function(type){

    }
}