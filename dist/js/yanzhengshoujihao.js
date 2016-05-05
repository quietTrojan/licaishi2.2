
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
    $('#codeVerify').on('click',function(){
        if($(this).hasClass('disabled')){
            return;
        }
        codeCountDown();
    });
});
