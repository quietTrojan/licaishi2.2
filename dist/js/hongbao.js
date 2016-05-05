/**
 * 重置表单元素
 */
function resetForm(){
    $(this).find('.error_p').hide();
    $(this).find('.formInput').val('');
    $(this).find('.totalVal').removeClass('valid').text('¥0.00');
    $(this).find('.submitBtn').addClass('disabled');
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
    //console.log('returnObj',returnObj);
    return returnObj;
}
$(function(){
    var tabTitle=$('#tabTitle'),
        tabItem_list=$('#tabContBox .tabItem'),
        curTabItem=tabItem_list.eq($(this).index());

    tabTitle.on('click','li',function(){
        if($(this).hasClass('active')){
            return;
        }

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        tabItem_list.hide();
        resetForm.apply(curTabItem.get(0));
        curTabItem.show();
    });

    tabItem_list.each(function(){
        var numInput=$(this).find('.num'),
            sumInput=$(this).find('.sum'),
            submitBtn=$(this).find('.submitBtn'),
            totalVal=$(this).find('.totalVal');

        numInput.add(sumInput).on('input',function(){
            var valStr= '¥',
                numValidObj=validNumer(numInput.val()),
                sumValidObj=validNumer(sumInput.val())
                validFlag=false;

            validFlag=numValidObj.valid && sumValidObj.valid;
            if(validFlag){
                valStr=valStr+(numValidObj.val*sumValidObj.val).toFixed(2);
                totalVal.addClass('valid');
                if(sumValidObj.val <= 200){
                    submitBtn.removeClass('disabled');
                }else{
                    submitBtn.addClass('disabled');
                }
            }else{
                valStr=valStr+'0.00';
                totalVal.removeClass('valid');
                submitBtn.addClass('disabled');
            }
            totalVal.text(valStr);
        });

        submitBtn.on('click',function(){
            if($(this).hasClass('disabled')){
                return;
            }else{
                alert('提交表单!');
            }
        });

    });
});
