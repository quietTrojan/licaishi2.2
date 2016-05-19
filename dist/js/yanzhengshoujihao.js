
function codeCountDown(){
    var count=60;
    var codeVerifyTimer=null;
    var codeVerify=$('#codeVerify');

    codeVerify.addClass('disabled');
    function countDown(){
        codeVerify.val(count+'秒后重新获取');
        codeVerifyTimer=setTimeout(function(){
            count=count-1;
            countDown();
        },1000);
        if(count<=0){
            clearTimeout(codeVerifyTimer);
            codeVerify.val('重新获取').removeClass('disabled');
        }
    }
    countDown();
}
$(function(){
    //一开始就发验证码，按钮进入倒计时状态
    codeCountDown();

    $('#codeVerify').on('click',function(){
        if($(this).hasClass('disabled')){
            return;
        }
        $('#code_errorTip').text('');
        $.ajax({
            url: "/fp/luckym/resendsms",
            method: "get",
            data: {
                'merchantNo':$('#merchantNo').val()
            },
            dataType: "text",
            success:function(returnVal){
                if(returnVal != '00'){
                    $('#code_errorTip').removeClass('suc').text('短信验证码发送失败!');
                }else{
                    $('#code_errorTip').addClass('suc').text('短信验证码发送成功!');
                }
            }
        });
        codeCountDown();
    });
    $('#submitBtn').on('click',function(){
        var checkCode=$('#checkCode');
        var merchantNo=$('#merchantNo');
        if(/^\s*$/.test(checkCode.val())){
            $('#code_errorTip').text('验证码不能为空!');
            return;
        }
        if($(this).data('ajaxLock')){
           return;
        }
        $(this).data('ajaxLock',true);
        $.ajax({
            url: "/fp/luckym/confim",
            method: "get",
            data: {
                'checkCode':checkCode.val(),
                'merchantNo':checkCode.val()
            },
            dataType: "text",
            success:function(returnVal){
                if(returnVal == '00'){
                    location.assign('');
                }else{
                    alert(returnVal);
                }
                $(this).data('ajaxLock',false);
            },
            error:function(){
                $(this).data('ajaxLock',false);
            }
        });
    });
});
