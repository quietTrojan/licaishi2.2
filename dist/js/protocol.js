$(function(){
    var parentWindow=null;
    if(window.parent){
        parentWindow=window.parent;
    }
    if(parentWindow){
        $(parentWindow).find('iframe').remove();
    }
});
