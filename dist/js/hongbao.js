/**
 * 重置表单元素
 */
function resetForm(){
    $(this).find('.error_p').text('');
    $(this).find('.formInput').val('');
    $(this).find('.totalVal').removeClass('valid').text('¥0.00');
    $(this).find('.submitBtn');
}
/**
 * 验证输入数字的合法性，是否为正整数
 * @param {string} str 输入的数字
 */
function validNumer(str){
    var tmpNum= 0,
        returnObj={
        'val':0,
        'valid':true
    };
    if(isNaN(str)){
        returnObj.valid=false;
    }else{
        tmpNum=parseInt(str);
        if(tmpNum <= 0 || tmpNum != Number(str)){
            returnObj.valid=false;
        }
    }
    if(returnObj.valid){
        returnObj.val = tmpNum;
    }
    return returnObj;
}
function inputVerify(){
    var flag=true;
    var inputVal=$(this).val();
    var inputWrap=$(this).parents('.inputWrap:first');
    var curLabel=inputWrap.children('div:eq(0)').text();
    var errorP=inputWrap.nextAll('.error_p:first');

    if(/^\s*$/.test(inputVal)){
        errorP.text(curLabel+'不能为空！');
        flag=false;
    }else if(!validNumer(inputVal).valid){
        errorP.text(curLabel+'必须为正整数！');
        flag=false;
    }
    return flag;
}
function formVerify(curTabItem){
    var flag=true;
    var curIndex=curTabItem.index();
    var numInput=curTabItem.find('.num');
    var sumInput=curTabItem.find('.sum');

    curTabItem.find('.error_p').text('');
    flag=inputVerify.apply(numInput.get(0));
    if(!flag){
        return flag;
    }
    if(numInput.val()>100){
        numInput.parents('.inputWrap:first').nextAll('.error_p:first').text('红包个数必须是最小为1，最大为100');
        flag=false;
    }
    if(!flag){
        return flag;
    }
    flag=inputVerify.apply(sumInput.get(0));
    if(!flag){
        return flag;
    }
    if(curIndex==0){
        if(sumInput.val()>200){
            sumInput.parents('.inputWrap:first').nextAll('.error_p:first').text('单个金额不能超过200元！');
            flag=false;
        }
    }else if(curIndex==1){
        if(sumInput.val()>numInput.val()*200){
            sumInput.parents('.inputWrap:first').nextAll('.error_p:first').text('总金额不能超过'+numInput.val()*200+'元！');
            flag=false;
        }
    }
    return flag;
}
function formSubmit(numInput,sumInput,curIndex){
    var formBox=$('#formBox');
    formBox.find('input[name="lmamount"]').val(numInput.val());
    formBox.find('input[name="lmoney"]').val(sumInput.val());
    formBox.find('input[name="lmtype"]').val(curIndex);
    //formBox.submit();
}
$(function(){
    var tabTitle=$('#tabTitle');
    var tabItem_list=$('#tabContBox .tabItem');
    var tabContBox=$('#tabContBox');

    tabTitle.on('click','li',function(){
        var curTabItem=tabItem_list.eq($(this).index());
        if($(this).hasClass('active')){
            return;
        }

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        tabItem_list.hide();
        resetForm.apply(curTabItem.get(0));
        curTabItem.show();
    });

    tabContBox.on('input','.formInput',function(){
        var curTabItem=$(this).parents('.tabItem:first');
        var curIndex=curTabItem.index();
        var numInput=curTabItem.find('.num');
        var sumInput=curTabItem.find('.sum');
        var totalVal=curTabItem.find('.totalVal');

        var valPrefix= '¥';
        var valStr= '¥';
        var numValidObj=validNumer(numInput.val());
        var sumValidObj=validNumer(sumInput.val());
        var validFlag=false;

        if(curIndex==0){
            validFlag=numValidObj.valid && sumValidObj.valid;
            valStr=(numValidObj.val*sumValidObj.val).toFixed(2);
        }else{
            validFlag=sumValidObj.valid;
            valStr=sumValidObj.val.toFixed(2);
        }

        if(validFlag){
            totalVal.addClass('valid');
        }else{
            valStr='0.00';
            totalVal.removeClass('valid');
        }
        totalVal.text(valPrefix+valStr);
    });

    tabContBox.on('click','.submitBtn',function(){
        var curTabItem=$(this).parents('.tabItem:first');
        var curIndex=curTabItem.index();
        var numInput=curTabItem.find('.num');
        var sumInput=curTabItem.find('.sum');

        if(formVerify(curTabItem)){
            formSubmit(numInput,sumInput,curIndex);
        }

    });
});
