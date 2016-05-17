/**
 * 获得错误提示位置
 * @param jqObj
 * @returns {*}
 */
function getErrorP(jqObj){
    if(!(jqObj instanceof jQuery)){
        jqObj=$(jqObj);
    }
    return jqObj.parents('.formGroup:first').next('.error_p');
}

function verifyInput(formatReg){
    var emptyRegexp=/^\s*$/;
    var inputVal=$(this).val();
    var labelName=$(this).parents('.inputWrap:first').prev('label').text();
    var verifyFlag=true;

    if(emptyRegexp.test(inputVal)){
        verifyFlag=false;
        getErrorP(this).text(labelName+'不能为空！');
    }else if(!formatReg.test(inputVal)){
        verifyFlag=false;
        getErrorP(this).text(labelName+'格式不正确！');
    }

    return verifyFlag;
}
function verifyForm(){
    var bankType=$('#bankType');
    var verifyFlag=true;

    $('#formBox .error_p').text('');
    if(!bankType.data('hasBank')){
        verifyFlag=false;
        getErrorP(bankType).text('卡类型不能为空！');
    }

    $('#bankNum,#bankMobile,#idcard').each(function(){
        var formatReg=null;
        switch ($(this).attr('id')){
            case 'bankNum':{
                formatReg=/^(\d{16}|\d{19})$/;
                break;
            }
            case 'bankMobile':{
                formatReg=/^1\d{10}$/;
                break;
            }
            case 'idcard':{
                formatReg=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
                break;
            }
        }
        if(!verifyInput.apply(this,[formatReg])){
            verifyFlag=false;
        }
    });
    //console.log(verifyFlag);
    return verifyFlag;
}
$(function(){
    $('#submitBtn').on('click',function(){
        if(verifyForm()){
            alert('表单提交!');
        }
    });
});

