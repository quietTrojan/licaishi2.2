$(function(){
    $('.itemBox').each(function(){
        var cur_A=$(this).find('.oprBtn');
        if(/^\s*分享\s*$/.test(cur_A.text())){
            cur_A.attr('href','heheh');
        }
    });
});
