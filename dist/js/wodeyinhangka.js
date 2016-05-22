
$(function(){

    var maskDiv=$('#maskDiv');
    var confirmPop=$('#confirmPop');
    var unBind=$('#unBind');
    var btnS=confirmPop.find('input[type="button"]');
    var existBankWrap=$('#existBankWrap');
    var noBankWrap=$('#noBankWrap');

    btnS.eq(0).on('click',function(){
        maskDiv.add(confirmPop).hide();
        showLoading();

        $.ajax({
            url: "",
            method: "",
            data: {

            },
            dataType: "text",
            success:function(returnVal){
                if(returnVal=="00"){
                    hideLoading();
                    existBankWrap.hide();
                    noBankWrap.show();
                }else{
                    hideLoading();
                    alertTip('服务器端异常，请稍候重试!');
                }

            },
            error:function(){
                hideLoading();
                alertTip('服务器端异常，请稍候重试!');
            }
        });
    });
    btnS.eq(1).on('click',function(){
        maskDiv.add(confirmPop).hide();
    });
    unBind.on('click',function(){
        maskDiv.add(confirmPop).show();
    });

    function alertTip(textTip,callBack){
        var alertPop=$('#alertPop');
        alertPop.find('.tipText').text(textTip);
        alertPop.add(maskDiv).show();
        if(typeof callBack != "undefined"){
            alertPop.unbind('click').on('click',function(){
                callBack(alertPop);
                alertPop.add(maskDiv).hide();
            });
        }else{
            alertPop.unbind('click').on('click',function(){
                alertPop.add(maskDiv).hide();
            });
        }
    }
});
