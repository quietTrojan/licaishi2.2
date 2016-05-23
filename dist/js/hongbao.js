/**
 * 显示弹框提示
 * @param htmlStr
 * @param title 如果不传入，默认是"购买失败"
 */
function showPopTip(htmlStr,title,callBack){
    var tipPopBox=$('#tipPopBox');
    var tip_text_p=tipPopBox.find('.cont p');
    tip_text_p.html(htmlStr);
    tipPopBox.css({
        'margin-top':-tipPopBox.height()/2
    });
    if(typeof title =="undefined"){
        title="购买失败"
    }
    if(typeof callBack !="undefined"){
        callBack();
    }
    tipPopBox.find('.title').text(title);
    $('#maskDiv').add(tipPopBox).show();
}
function hidePopTip(){
    $('#maskDiv,#tipPopBox').hide();
}
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
            'valid':true,
            'errorText':''
    };
    if(isNaN(str) || /^\s*0.*/.test(str)){
        returnObj.valid=false;
    }else{
        tmpNum=parseInt(str);
        if(tmpNum <= 0 || tmpNum != Number(str)){
            returnObj.valid=false;
        }
    }
    if(returnObj.valid){
        returnObj.val = tmpNum;
    }else{
        returnObj.errorText="必须为正整数！";
    }
    return returnObj;
}

/**
 * 判断有几位小数
 * @param str
 */
function decimalsNum(str){
    var decimalVal=str.split('.')[1];
    if(typeof decimalVal != 'undefined'){
        return decimalVal.length;
    }else{
        return 0;
    }
}
/**
 * 验证金额的合法性
 * @param str
 * @returns {{val: number, valid: boolean, errorText: string}}
 */
function validMoney(str){
    var tmpNum= 0,
        returnObj={
            'val':0,
            'valid':true,
            'errorText':''
        };
    if(isNaN(str) || /^\s*0\d+/.test(str)){
        returnObj.valid=false;
        returnObj.errorText="必须为数字";
    }else if(str<1){
        returnObj.valid=false;
        returnObj.errorText="不低于1元";
    }

    if(returnObj.valid){
        returnObj.val = Number(str);
    }
    return returnObj;
}
function inputVerify(validType){
    var flag=true;
    var inputVal=$(this).val();
    var inputWrap=$(this).parents('.inputWrap:first');
    var curLabel=inputWrap.children('div:eq(0)').text();
    var errorP=inputWrap.nextAll('.error_p:first');
    var validResult=null;

    validResult=validType(inputVal);
    if(/^\s*$/.test(inputVal)){
        errorP.text(curLabel+'不能为空！');
        flag=false;
    }else if(!validResult.valid){
        errorP.text(curLabel+validResult.errorText);
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
    flag=inputVerify.apply(numInput.get(0),[validNumer]);
    if(!flag){
        return flag;
    }
    if(numInput.val()>100){
        numInput.parents('.inputWrap:first').nextAll('.error_p:first').text('一次最多发100个红包');
        flag=false;
    }
    if(!flag){
        return flag;
    }
    flag=inputVerify.apply(sumInput.get(0),[validMoney]);
    if(!flag){
        return flag;
    }
    if(decimalsNum(sumInput.val())>2){
        sumInput.parents('.inputWrap:first').nextAll('.error_p:first').text('金额最多两位小数');
        flag=false;
    }
    if(!flag){
        return flag;
    }
    if(curIndex==0){
        if(sumInput.val()>200){
            sumInput.parents('.inputWrap:first').nextAll('.error_p:first').text('单个红包金额不可超过200元');
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
function limitVerify(totalVal){
    var plat_limit=Number($('#plat_limit').text());//平台限额
    var person_limit=Number($('#person_limit').text());;//个人限额
    var person_dayLimit=Number($('#person_dayLimit').val());
    var tipHtmlStr='';
    var flag=false;

    if(person_limit==0){
        tipHtmlStr="您今日可购买额度已用完，明天再来。";
    }else if(plat_limit==0){
        tipHtmlStr="今日平台限额已用完，明日请早！";
    }else if(totalVal>person_limit){
        tipHtmlStr="您每日最高限额<span>"+person_dayLimit+"</span>元，当前剩余可用额度为<span>"+person_limit+"</span>元，请修改红包金额。";
        flag=false;
    }else if(totalVal>plat_limit){
        tipHtmlStr="平台今日剩余额度为<span>"+plat_limit+"</span>元，请修改红包金额。";
    }else{
        flag=true;
    }

    if(!flag){
        showPopTip(tipHtmlStr);
    }
    return flag;
}
function formSubmit(numInput,sumInput,wishesInput,curIndex){
    var formBox=$('#formBox');
    formBox.find('input[name="lmamount"]').val(numInput.val());
    formBox.find('input[name="lmoney"]').val(sumInput.val());
    formBox.find('input[name="wishes"]').val(wishesInput.val());
    formBox.find('input[name="lmtype"]').val(curIndex);
    //formBox.submit();
}

$(function(){


    //清除缓存的表单元素
    $('.formInput').val('');

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
        var sumValidObj=validMoney(sumInput.val());
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
        totalVal.text(valPrefix+valStr).data('totalVal',valStr);
    });

    //同意协议并购买
    $('#submitBtn').on('click',function(){

        var curTabItem=tabItem_list.eq(tabTitle.find('li.active').index());
        var curIndex=curTabItem.index();
        var numInput=curTabItem.find('.num');
        var sumInput=curTabItem.find('.sum');
        var wishesInput=curTabItem.find('.formTextArea');
        var totalVal=Number(curTabItem.find('.totalVal').data('totalVal'));

        if(formVerify(curTabItem) && limitVerify(totalVal)){
            formSubmit(numInput,sumInput,wishesInput,curIndex);
        }
    });

    $('#tipPopBox .okBtn').on('click',function(){
        hidePopTip();
    });

});
