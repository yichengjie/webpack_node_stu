let _ = require('lodash') ;
let util = require('util_lib') ;
let ht = 140 ;
let moment = require('moment_lib') ;
export const defaultPageSize = 15  ;
export const defaultOrderTitleName = "lastUpdateDate" ;
var datetimeForm = "YYYY-MM-DD hh:mm" ;


export function convertDateTimeStr2Date(str){
    return moment(str, datetimeForm) ;
}

//排序数据
export function orderListData(list,titleName,ascFlag){
    if(titleName&&titleName.length>0&&titleName!=='default'){
        let orderTypeStr = ascFlag ? 'asc' : 'desc' ;
        let retArr = _.orderBy(list, [titleName], [orderTypeStr]);
        list.splice(0,list.length) ;
        retArr.forEach(item => list.push(item) ) ;
    }
}

//生成一个随机数
export function random (min,max){
    return function(){
        return _.random(min,max);
    };
}

export function toastInfo(msg){
	util.toastInfo(msg,ht) ;
}
export function toastDanger(msg){
	util.toastDanger(msg,ht) ;
}
export function toastSuccess(msg){
	util.toastSuccess(msg,ht) ;
}

/**根据serviceType判断服务是否为行李 */
export function isBaggageByServiceType(serviceType){
    if(['A','B','C','E','P'].includes(serviceType)){
        return true;
    }
    return false ;
}