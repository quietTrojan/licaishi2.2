$(function(){
    var lockFlag=false;
    $('#listBox').on('click','li',function(){
        var curSpan=$(this).find('div:eq(0) span');
        if(lockFlag){
            return;
        }
        lockFlag=true;
        curSpan.addClass('checked');
        setTimeout(function(){
            location.assign('/fp/luckym/hb?banktype='+encodeURIComponent(curSpan.text()));
        },1000);
    });
});

