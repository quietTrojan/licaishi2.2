$(function(){
    $('#listBox').on('click','li div span',function(){
        $(this).addClass('checked');
        setTimeout(function(){
            location.assign('http://www.baidu.com');
        },2000);
    });
});

