var util = require('util_lib') ;
import {isBaggageByServiceType} from '../../common/common.js' ;

//校验的func的简单封装
export function wrapValidateFn(validateFn,cfg){
    return function(rule,value,callback){
        let {vvm,...otherCfg} = cfg ;
        return validateFn.call(null,value,callback,vvm,otherCfg) ;
    };
}

//校验销售生效日期
export function validateFirstMaintenanceDate(value,callback){
      //console.info('cfg : ' + cfg) ;
      //let {lastMaintenanceDate} = cfg.vm.formData ;
      if(value&&value.length>0){//大于当前时间下一小时0分
            let flag = util.isBiggerDateTimeThanCurrentNextHour(value) ;
            //console.info('flag : ' + flag) ;
            if(!flag){
                callback('需大于下一小时0分!');
                return false;
            }
            callback&&callback() ;
            return true ;
      }else{
            callback&&callback() ;
            return true ;
      }
}
//校验销售截止日期
export function validateLastMaintenanceDate(value,callback,vvm){
      //console.info('formData : ' ,formData) ;
      let {firstMaintenanceDate} = vvm.formData  ;
      if(firstMaintenanceDate&&firstMaintenanceDate.length>0&&value&&value.length>0){//截止日期需要大于生效日期
           let flag = util.isBiggerDateTimeThan(value,firstMaintenanceDate) ;
           if(!flag){
               callback('截止日期需大于生效日期');
               return false;
            }
            callback&&callback() ;
            return true ;
      }else{
            callback&&callback() ;
            return true ;
      }
}
//校验使用时间限制
export function validateUseDateLimit(value,callback,vvm){
      let useDateLimitTye = vvm.formData.useDateLimitTye  ;
      let {firstUseDate,lastUseDate,effectivePeriodType,effectivePeriodNumber,effectivePeriodUnit} = vvm.formData ;
      if(useDateLimitTye==='1'){
          if(effectivePeriodType===''){
              if(effectivePeriodNumber!==''||effectivePeriodUnit!==''){
                   callback('期限类型必填') ;
                   return false;  
              } 
              callback() ;
              return true;   
          }else{//type 不为空 
             if(effectivePeriodNumber ===''||effectivePeriodUnit ===''){
                  callback('期限值必填') ;
                  return false;  
             } 
             callback() ;
             return true;   
          }
      }else{
          let flag1 = true ; 
          let flag2 = true ;
          let count = 0 ;
          if(firstUseDate&&firstUseDate.length>0){
              flag1 = util.isBiggerThanCurrent(firstUseDate) ;
              count ++ ;
          }
          if(flag1&&lastUseDate&&lastUseDate.length>0){
              flag2 = util.isBiggerThanCurrent(lastUseDate) ;
              count ++ ;
          }
          if( (!flag1) || (!flag2) ){
              callback('日期必须大于今天') ;
              return false;
          }
          //如果截止日期还必须大于生效日期
          if(flag1&&flag2&& (count ===2)){
              let flag3 = util.isBiggerDateThan(lastUseDate,firstUseDate) ; 
              if(!flag3){
                callback('结束必须大于起始值') ;
                return false;
              }
          }
          callback() ;
          return true ;
      }
}

export function validateAllEmptyOrNot(value,callback,vvm,otherCfg){
    let {name1,name2} = otherCfg ;
    let formData = vvm.formData ;
    let value1 = (formData[name1]);
    let value2 = (formData[name2]) ;
    //console.info('name1 : ['+name1+'] , value  : ['+value1+'] ') ;
    //console.info('name1 : ['+name1+'] , value : ['+value2+'] ') ;
    if(value1 ===''){
        if(value2!==''){
            callback('同时有值或无值!') ;
            return false;
        }
    }else{//如果value1不为空
        if(value2===''){
            callback('同时有值或无值!') ;
            return false;
        }
    }
    callback() ;
    return true ;
}

/**校验字母或数字的组合输入 */
export function validateLettersOrNumber(value,callback){
    let flag = util.islettersOrNumber(value);
    if(!flag){
        callback('字母或数字组合!') ;
        return false;
    }
    callback() ;
    return true ;
}
/**校验字母的组合输入 */
export function validateLetter(value,callback){
    if(value !=null && value!==''){
        let flag = util.isLetter(value);
        if(!flag){
            callback('请输入字母!') ;
            return false;
        }
    }
    callback() ;
    return true ;
}



/**数字后者大于前者校验 */
export function validateBiggerNumber(value,callback,vvm,otherCfg){
    //console.info('cfg' ,cfg) ;
    let {smallerNum,biggerNum} = otherCfg ;
    let formData = vvm['formData'] ;
    let smaller = formData[smallerNum] ;
    let bigger = formData[biggerNum] ;
    //console.info('smaller : ['+smaller+']') ;
    //console.info('bigger : ['+bigger+']') ;
    if(smaller !=='' && bigger !==''){
        if(smaller>bigger){
            callback('最大值不能小于最小值!');
            return false ;
        }
    }
    callback() ;
    return true;   
}


/**是否收费的校验逻辑 */
export function validateNoChargeNotAvailable(value,callback,vvm){
    //是否收费，170-201，里程费，适用于//免费行李件数
    let serviceType = vvm.serviceData.serviceType ;
    let {formData:{noChargeNotAvailable,list170VO,list201VO,specifiedServiceFeeMileage,specifiedServiceFeeApp,freeBaggageAllowancePieces}} = vvm ;
    if(['D','O'].includes(noChargeNotAvailable)){
        //如果是行李的话
        if(isBaggageByServiceType(serviceType)){
            let tNum = Number(freeBaggageAllowancePieces) ;
            if(tNum!==0){
                callback('收费为D/O时,【免费行李件数】必须为0!') ;
                return false;
            }
        }
    }else if(['X','F','E','G','H'].includes(noChargeNotAvailable)){
        if(list170VO.length>0||list201VO.length>0){
            callback('当为免费时【金额】必须为空!') ;
            return false;
        }
        if(specifiedServiceFeeMileage!==''){
            callback('当为免费时【里程费】必须为空!') ;
            return false;
        }
        if(specifiedServiceFeeApp!==''){
            callback('当不为D/O时【适用于】必须为空!') ;
            return false;
        }
    }
    callback() ;
    return true ;
}
/**适用于的校验逻辑 */
export function validateSpecifiedServiceFeeApp(value,callback,vvm){
    //适用于,是否收费,list170VO,list201VO,serviceType//specifiedServiceFeeApp
    let {formData:{specifiedServiceFeeApp,noChargeNotAvailable,list170VO,list201VO},serviceData:{serviceType}} = vvm ;
    //当值为空时：1.收费（Not Available/No Charge）字段的值必须为D/X/F/E。
    if( ['D','X','F','E'].includes(noChargeNotAvailable)){
        if(specifiedServiceFeeApp!==''){
            callback('收费为D/X/F/E时，【适用于】必须为空!') ;
            return false;
        }
    }
    if(['H','C','P'].includes(specifiedServiceFeeApp)){//否则就是字段不为空
        //当本字段的值为H/C/P时，T170和T201的值为0
        if(list170VO.length>0||list201VO.length>0){
            callback('当金额有值，【适用于】不能为H/C/P') ;
            return false;
        }
    }
    callback() ;
    return true ;
}

//里程费
export function validateSpecifiedServiceFeeMileage(value,callback,vvm){
    //当 ‘或/和’ 字段为 ‘和’ 时 ，里程费必填//里程积分兑换标识不为空的时候，里程费必须为空
    let {formData:{specSevFeeAndOrIndicator,mileageExchangeIndicator,discountOrNot}} = vvm ;
    //specSevFeeAndOrIndicator=='A'
    if(specSevFeeAndOrIndicator==='A'){
        if(value===''){
            callback('当【或/和】为‘和’时，里程费必填!') ;
            return false; 
        }
    }
    if(mileageExchangeIndicator !==''){//如果里程积分兑换标识不为空，则里程费必须为空空
        if(value===''){
            callback('当【里程积分兑换标识】为兑换时，里程费必须为空!') ;
            return false; 
        }
    }
    //如果为折扣，则里程费必须为空
    if(discountOrNot==='0'){
        if(value===''){
            callback('当【金额】为折扣时，里程费必须为空!') ;
            return false; 
        }
    }
    callback() ;
    return true ;
}




//优先级序号
export function validateSequenceNumber(value,callback){
    let {action} = util.getJspPageParam() ;
    if(action==='update'){
        if(value===''){
            callback('更新时【优先级序号】必填') ;
            return false;
        }
    }
    callback() ;
    return true ;
}

/**日期大于当前日期 */
export function validateBiggerCurrentDate(value,callback){
    if(value!==''){
        //console.info('value : ' + value) ;
        let flag = util.isDateOC(value) ;
        //console.info('flag : ' + flag) ;
        if(flag){
            flag = util.isBiggerThanCurrent(value) ;
            if(flag){
                callback() ;
                return true ;
            }else{
                callback('必须大于当前日期!') ;
                return false;
            }
        }else{
            callback('日期格式不合法!') ;
            return false;
        }
    }
    callback() ;
    return true ;
}
/**旅行结束日期校验 */
export function validateTravelEndDate(value,callback,vvm){
   // console.info('旅行结束日期 ：'　,value) ;
    if(value!==''){
        let flag = util.isDateOC(value) ;
        if(flag){
            flag = util.isBiggerThanCurrent(value) ;
            if(flag){
                let travelStartDate = vvm.formData.travelStartDate ;
                if(travelStartDate!==''){
                    flag = util.isBiggerDateThan(value,travelStartDate) ;
                    if(!flag){
                        callback('【结束日期】不能小于【起始日期】') ;
                        return false;
                    }
                }
                callback() ;
                return true ;
            }else{
                callback('必须大于当前日期!') ;
                return false;
            }
        }else{
            callback('日期格式不合法!') ;
            return false;
        }
    }
    callback() ;
    return true ;
}


export function validatGeoSpec(value,callback,vvm,otherCfg){
    let msgObj = {A:'大区代码错误!',C:'城市代码错误',N:'国家代码错误','P':'机场代码错误',S:'州代码错误',Z:'区域代码错误'} ;
    let {name1,name2} = otherCfg ;
    let {formData} = vvm ;
    let geoSpecLocType = formData[name1] ;
    let geoSpecLoc = formData[name2] ;
    if(geoSpecLocType===''){
        if(geoSpecLoc!==''){
            callback('区域类型必填!') ;
            return false;
        }else{
            callback() ;
            return true ;
        }
    }else{//如果类型不为空
        if(geoSpecLoc===''){
            callback('区域代码必填!') ;
            return false;
        }else{
           let flag = util.isValidGeoLocal(geoSpecLoc,geoSpecLocType) ;
           if(flag){
               callback() ;
               return true ;
           }else{
               callback(msgObj[geoSpecLocType]) ;
               return true ;
           }
        }
    }
}
//区域限制校验
export function validateGeoSpecFromToWithin(value,callback,vvm){
    let formData = vvm.formData ;
    let {geoSpecFromToWithin,geoSpecSectPortJourney,geoSpecStopConnDes,
        geoSpecLoc1Type,geoSpecLoc1,list178Loc1,
        geoSpecLoc2Type,geoSpecLoc2,list178Loc2,
        geoSpecLoc3Type,geoSpecLoc3,list178Loc3} = formData ;

    let loc1IsNullFlag = _checkLocIsNull(geoSpecLoc1Type,geoSpecLoc1,list178Loc1) ;
	let loc2IsNullFlag = _checkLocIsNull(geoSpecLoc2Type,geoSpecLoc2,list178Loc2) ;
	let loc3IsNullFlag = _checkLocIsNull(geoSpecLoc3Type,geoSpecLoc3,list178Loc3) ;
    if(geoSpecFromToWithin!==''){
        if(loc1IsNullFlag){
           callback('选择的不是“不限区域”，【区域1】必填！') ;
           return false;  
        }
    }
    if(geoSpecFromToWithin==='W'){
        if(!loc2IsNullFlag||!loc3IsNullFlag){
            callback('选择“区域1内部”,【区域2】和【经过区域】不能有值!') ;
            return false;
        }
    }
    callback() ;
    return true ;
}

//检查区域字段是否为空
function _checkLocIsNull(locType,locCode,list) {
    if( (locType==='' && locCode==='')){
        if(list ==null || list.length ===0){
            return true ;
        }
    }
    return false;
}
//区域部分全程
export function validateGeoSpecSectPortJourney(value,callback,vvm){
    let formData = vvm.formData ;
    let {geoSpecFromToWithin,geoSpecStopConnDes,
        geoSpecLoc1Type,geoSpecLoc1,list178Loc1,
        geoSpecLoc2Type,geoSpecLoc2,list178Loc2,
        geoSpecLoc3Type,geoSpecLoc3,list178Loc3} = formData ;
    let loc1IsNullFlag = _checkLocIsNull(geoSpecLoc1Type,geoSpecLoc1,list178Loc1) ;
	let loc2IsNullFlag = _checkLocIsNull(geoSpecLoc2Type,geoSpecLoc2,list178Loc2) ;
	let loc3IsNullFlag = _checkLocIsNull(geoSpecLoc3Type,geoSpecLoc3,list178Loc3) ;
    if(value === ''){
        if(!loc1IsNullFlag){
            callback('【Sector/Portion/Journey】为空,【区域1】必须为空!') ;
            return false;
        }
    }else if(value==='P'){
        var astr = '' ;
        var flag2= (loc2IsNullFlag&&geoSpecFromToWithin!='W'&&geoSpecStopConnDes!='T') ;
        if(loc1IsNullFlag&&flag2){
            astr = '【sector/portion/journey】选择了portion，【区域1】必填，且：【区域2】有值，或者【区域限制】选择“区域1内部”，或者【经停类型】字段填“T”!' ;
            callback(astr) ;
            return false;
        }else if (loc1IsNullFlag){
            astr = '【Sector/Portion/Journey】选择了Portion，【区域1】必填!' ;
            callback(astr) ;
            return false;
        }else if(flag2){
            astr = '【Sector/Portion/Journey】选择了Portion，【区域2】必填，或者【区域限制】选择“区域1内部”，或者【经停类型】字段填“T”!' ;
            callback(astr) ;
            return false;
        }
    }else if(value=='J'){
        if(loc1IsNullFlag||loc2IsNullFlag){
            callback('【Sector/Portion/Journey】选择了Journey，【区域1】和【区域2】必填!') ;
            return false;
        }
    }
    callback() ;
    return true ;
}


export const i18n_cn ={
  required: '%s 必填',
};
