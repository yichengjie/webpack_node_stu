import {isBaggageByServiceType} from '../../common/common.js' ;
import {queryTable163ListApi} from 'apiPath/s7-edit.js' ;

//改变select的各个option是否可选
export function changeGlobalOptionStatus(optionsData,checkedItem){
    //改变是否收费
    let {serviceType,attributesSubgroup,commercialName} = checkedItem ;
    //console.info(checkedItem) ;
    _changeNoChargeNotAvailableOption(optionsData,serviceType) ;
    _changeSpecSevFeeAndOrIndicatorOption(optionsData,serviceType) ;
    _changeAvailabilityOption(optionsData,serviceType) ;
    _changeGeoSpecSectPortJourneyOption(optionsData,serviceType,attributesSubgroup) ;
    _changeEffectivePeriodTypeOption(optionsData,attributesSubgroup) ;
    //适用于
    _changeSpecifiedServiceFeeAppOption(optionsData,serviceType) ;
    //tb163List
    //console.info('checkedItem : ' ,checkedItem) ;
    
    
}

export function changeGlobalOptionDefaultValue(formData,checkedItem){
     let {serviceType,attributesSubgroup} = checkedItem ;
     _changeNoChargeNotAvailableDefaultValue(formData,serviceType) ;
     _changeSpecSevFeeAndOrIndicatorDefaultValue(formData,serviceType) ;
     _changeAvailabilityDefaultValue(formData,serviceType) ;
     _changeGeoSpecSectPortJourneyDefaultValue(formData,serviceType,attributesSubgroup) ;
     _changeEffectivePeriodTypeDefaultValue(formData,attributesSubgroup) ;
}

/**更新‘区域/部分/全程’ */
function _changeGeoSpecSectPortJourneyOption(optionsData,serviceType,attributesSubgroup){
    //['','S','P','J']
    let list = optionsData['geoSpecSectPortJourney'] ;
    if(['B','E'].includes(serviceType)){//
         _changeDisableHelper(list,['','P','J']) ;
    }else if(['A','C','P'].includes(serviceType)){
         _changeDisableHelper(list,['S']) ;
    }else if(['M','R','T'].includes(serviceType)){
         _changeDisableHelper(list,['S','P','J']) ;
    }else if('F'===serviceType){
        if(attributesSubgroup==='FP'){
            _changeDisableHelper(list,['','S']) ;
        }else{
             _changeDisableHelper(list,['']) ;
        }
    }
}
function _changeGeoSpecSectPortJourneyDefaultValue(formData,serviceType,attributesSubgroup){
    if(['B','E'].includes(serviceType)){
	   formData.geoSpecSectPortJourney = 'S' ;
    }else if(serviceType==='F'){
	  if(attributesSubgroup ==='FP'){//这里其实可以在下面直接判断当subgroup为fp时区域部分全程为‘J’
		 formData.geoSpecSectPortJourney = 'J' ;
	  }else{
		 formData.geoSpecSectPortJourney = 'S' ;
	  }
    }else{/**'M','R','T','A','C','P' */
	  formData.geoSpecSectPortJourney = '' ;
    }
}

/**更新‘是否检查库存’ */
function _changeAvailabilityOption(optionsData,serviceType){
    let list = optionsData['availability'] ;
    if(['A','B','E'].includes(serviceType)){
        _changeDisableHelper(list,['Y']) ;
    }else{
        _changeDisableHelper(list,null) ;
    }
}
function _changeAvailabilityDefaultValue(formData,serviceType){
    if(['A','B','E'].includes(serviceType)){
        formData.availability = 'N' ;
    }
}

/**‘或/和’ options */
function _changeSpecSevFeeAndOrIndicatorOption(optionsData,serviceType){
    let list = optionsData['specSevFeeAndOrIndicator'] ;
    if(['A','B','E'].includes(serviceType)){
        _changeDisableHelper(list,['A']) ;
    }else{
        _changeDisableHelper(list,null) ;
    }
}
/**‘或/和’ default value */
function _changeSpecSevFeeAndOrIndicatorDefaultValue(formData,serviceType){
    if(['A','B','E'].includes(serviceType)){
        formData.specSevFeeAndOrIndicator= '' ;
    }
}

/**改变是否收费 select的option */
function _changeNoChargeNotAvailableOption(optionsData,serviceType){
    let list = optionsData['noChargeNotAvailable'] ;
    //['','X','F','E','G','H','D','O']
    //console.info('serviceType : --- > ' + serviceType) ;
    if(serviceType==='A'){
        _changeDisableHelper(list,null) ;
    }else if(serviceType==='B'){
        _changeDisableHelper(list,['','X','E','G','H','D','O']) ;
    }else if(serviceType==='E'){
        _changeDisableHelper(list,['','F','E','G','H','D','O']) ;
    }else if(serviceType==='C'||serviceType==='P'){
        _changeDisableHelper(list,null) ;
    }else{
        _changeDisableHelper(list,['D','O']) ;
    }
}
/**改变是否收费 的默认值*/
function _changeNoChargeNotAvailableDefaultValue(formData,serviceType){
    if(serviceType==='A'){
        formData.noChargeNotAvailable = 'F' ;//设置为免费
    }else if(serviceType==='B'){
        formData.noChargeNotAvailable = 'F' ;//设置为免费
    }else if(serviceType==='E'){
        formData.noChargeNotAvailable = 'X' ;//设置为收费
    }else{
        formData.noChargeNotAvailable = '' ;//设置为收费
    }
}

/**适用于 */
function _changeSpecifiedServiceFeeAppOption(optionsData,serviceType){
    //['1','2','3','4','5','H','C','P','K','F']
    let list = optionsData['specifiedServiceFeeApp'] ;
    let obj = {
        F:['H','C','P','K','F'],
        M:['1','2','4','5','H','C','P','K','F'],
        R:['1','2','3','4','H','C','P','K','F'],
        T:['1','2','4','H','C','P','K','F'],
        A:['1','2','3','4','5','H','C','P','K','F'],
        B:['1','2','3','4','5','H','C','P','K','F'],
        C:['1','2','5'],
        E:['1','2','3','4','5','H','C','P','K','F'],
        P:['1','2','5']
    } ;
     _changeDisableHelper(list,obj[serviceType]) ;
     //对适用于的特殊处理
     let str3 = '每用一次服务算一次服务费用' ;
     let str4 = '匹配的部分航程算一次服务费用' ;
     if(isBaggageByServiceType(serviceType)){
        str3 = '按托运点收费' ;
        str4 = '按全行程收费' ;
     }
     list.forEach(item=>{
        if(item.value==='3'){
            item.name = str3 ;
        }else if(item.value==='4'){
            item.name = str4 ;
        }
     }) ;
}

function _changeEffectivePeriodTypeOption(optionsData,attributesSubgroup){
    let list = optionsData['effectivePeriodType'] ;
    let disableValueList = null ;
    if('FP'===attributesSubgroup){
        disableValueList = ['B','D'] ;
    }else if('FL'===attributesSubgroup){
         disableValueList = ['A'] ;
    }
    _changeDisableHelper(list,disableValueList) ;
}
function _changeEffectivePeriodTypeDefaultValue(formData,attributesSubgroup){
    if(['FL','FP'].includes(attributesSubgroup)){
        formData['effectivePeriodType'] = '' ;
    }
}


function _changeDisableHelper(list,disableValueList){
    if(disableValueList == null || disableValueList.length===0){
        list.forEach(item=>{
            item.disabled = false;
        }) ;
    }else{
        list.forEach(item=>{
            if(disableValueList.includes(item.value)){
                item.disabled = true;
            }else{
                item.disabled = false;
            }
        }) ;
    }
}


/**
 * 查询163并填充到otherData的list163中，方便后面折扣切换的时候使用
 */
export function fill163ListVO (checkedItem,list163) {
    //清空163原有的数据
    list163.splice(0, list163.length) ;
    //套餐:serviceGroup!=null&&serviceGroup.length>2&&serviceGroup.indexOf('BD')===0
    let {attributesGroup} = checkedItem  ;
    if(attributesGroup!=null&&attributesGroup.length>2&&attributesGroup.indexOf('BD')===0){
        _query163AndFill201(checkedItem,list163) ;
    }else{
        _NotQuery163AndFill201(checkedItem,list163) ;
    }
}

/**
 * 套餐时
 */
function _query163AndFill201(checkedItem,list201VO){
    //查新
    var promise = queryTable163ListApi(checkedItem) ;
    promise.then((retData) => {
        var list163 = retData.tb163List ;
        var tmpList201 = _getList201VOBy163(list163) ;
        fillList1ToList2(tmpList201,list201VO) ;
    },function(error){
        console.info('查询163报错') ;
    }) ;
}

/**
 * 当不是套餐时
 */
function _NotQuery163AndFill201(checkedItem,list201VO){
    var subCode = checkedItem.serviceSubCode ;
    var commercialName = checkedItem.commercialName ;
    var obj = _get201VO(subCode,commercialName) ;
    list201VO.push(obj) ;
}

/**
 * 将list1中的数据填充到list2中
 */
function fillList1ToList2 (list1,list2){
    for(let item of list1){
        list2.push(item) ;
    }
}


function _getList201VOBy163 (list163){
    var retList = [] ;
    for(let item of list163){
       let {subCode,commercialName} = item ;
       retList.push(_get201VO(subCode,commercialName))  ;
    }
    return retList ;
}


function _get201VO(subCode,commercialName){
    let discountType = "1" ;
    let priceNum = "" ;
    var obj = {subCode,commercialName,discountType,priceNum};
    return obj ;
}



