$(function(){
    var maskDiv=$('#maskDiv');
    var confirmPop=$('#confirmPop');
    var unBind=$('#unBind');
    var btnS=confirmPop.find('input[type="button"]');
    btnS.eq(0).on('click',function(){
        location.assign($('#unBind').data('skipUrl'));
    });
    btnS.eq(1).on('click',function(){
        maskDiv.add(confirmPop).hide();
    });
    unBind.on('click',function(){
        maskDiv.add(confirmPop).show();
    });
});
