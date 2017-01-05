import util from 'util_lib' ;
import {initPage4AddApi,initPage4UpdateApi,initPage4CopyApi} from 'apiPath/s7-edit.js' ;
import _ from 'lodash' ;
/**查询s5Id */
/**
 * @param list s5的记录集合
 * @param queryObj 查询参数
 */
export function findRecordS5Id(list,serviceType,serviceSubCode){
    let queryObj ={serviceType,serviceSubCode} ;
    //console.info('queryObj : ',queryObj) ;
    let retObj = _.find(list,queryObj) ;
    console.info('retObj : ',retObj) ;
    return retObj ? retObj.id :'' ;
}
/**
 * 处理页面上的保存按钮事件
 */
export function handleSaveForm(_vm){
    //console.info('_vm : ' + _vm) ;
    //console.info('formData : ' + JSON.stringify(_vm.formData)) ;
    //如果没有选择服务
    if(_vm.serviceData.recordS5Id===''){
        $.showTuiErrorDialog('请选择服务到最后一级！');
        return ;
    }
    //console.info('22222222222222') ;
    //var jqFlag = this.validator.form() ;
    //console.info('jquery validate flag  : ' +jqFlag )  ;
    //校验整个表单
    _vm.$refs.editForm.validate(function (valid){
        //console.info('33333333333333') ;
        if (valid) {
            alert('submit!');
        } else {
            console.log('error submit!!');
            return false;
        }
    });
}
/**
 * 初始化页面上的数据
 */
export function initPageData(_vm){
    let pageParam = util.getJspPageParam() ;
    let {action} = pageParam ;
   // console.info('==== [action] ==== : ' + action) ;
    switch(action){
        case 'add':
            _initPage4Add(_vm) ;
            break ;
        case 'update':
            _initPage4Update(_vm) ;
            break ;
        case 'copy':
           _initPage4Copy(_vm) ;
            break ;
        default:
            _initPage4Add(_vm) ;
            break ;
    }
}


function _getDayOfWeekArr(str){
    let retArr = [] ;
    if(str&&str.length>0){
        for(let i = 0 ; i < str.length ; i++){
            retArr.push(str[i]) ;
        }
    }
    return retArr ;
}

 //let id = '56372eb40480478a83e85040f945e416' ;//FP类型--F
//id ='8fefc6fcce0e4c8e8df3772cb3ac609a' ;//FL类型--F
//id = '7d10d15697e5477b83f09470c5a0f9fc';//A类型
//id = 'b293f43b9e9a4b4eb393e86307c921a6';//C类型
function _initPage4Update(_vm){
    //dayOfWeek要特殊处理
    initPage4UpdateApi().then(retData=>{
        _dealResult(_vm,retData) ;
    }) ;
}

function _initPage4Copy(_vm){
    initPage4CopyApi().then(retData=>{
        _dealResult(_vm,retData) ;
    }) ;
}


function _dealResult(_vm,retData){
    //处理db select 的option
    _initDBSelectList(_vm,retData) ;
     //dayOfWeek要特殊处理
    let s7VO = retData.s7VO ;
    console.info('retData : ' ,retData) ;
    //在将formData复制给vm的formData前将‘星期字段特殊处理’
    let dayOfWeekArr = _getDayOfWeekArr(s7VO.dayOfWeek) ;
    s7VO.dayOfWeek = dayOfWeekArr ;
    Object.assign(_vm.formData,s7VO) ;
    let list = retData.serviceChooseList ;
    for(let item of list){
        _vm.serviceData.serviceChooseList.push(item) ;
    }
    let {serviceType,serviceAndSubCode} = s7VO ;
    let id = findRecordS5Id(list,serviceType,serviceAndSubCode) ;
    //console.info('id : ' ,id) ;
    _vm.serviceData.recordS5Id = id;
}

function _initPage4Add(_vm){
     //默认服务类型为F
     initPage4AddApi().then(retData=>{
        _vm.serviceData.serviceType = 'F' ;
        if(retData.flag==='true'||retData.flag===true){
            let len = _vm.serviceData.serviceChooseList.length ;
            _vm.serviceData.serviceChooseList.splice(0,len) ;
            for(let item of retData.serviceChooseList){
                _vm.serviceData.serviceChooseList.push(item) ;
            }
            //处理db select 的option
             _initDBSelectList(_vm,retData) ;
             Object.assign( _vm.formData,retData.formData) ;
            //console.info("retList : " ,retData.serviceChooseList) ;
        }else{
            console.info('数据加载不完整...') ;
        }
    },error =>{
        console.info('error : ',error) ;
    });

}
/**填充页面上从数据库查询出来的select的option */
function _initDBSelectList(_vm,returnData){
    _dealDBOptionData(_vm.optionsData.passengerTypeCode,returnData.passengerList,_convertPassengerTypeCode) ;
    _dealDBOptionData(_vm.optionsData.frequentFlyerStatus,returnData.ffpList,_convertFrequentFlyerStatus) ;
    _dealDBOptionData(_vm.optionsData.equipment,returnData.equipmentList,_convertEquipment) ;
}

function _convertPassengerTypeCode(item){
    let {psgrTypeCode,psgrTypeDesc} = item ;
    return {name:psgrTypeDesc,value:psgrTypeCode,disabled:false} ;
}
function _convertFrequentFlyerStatus(item){
    let {cardType,ffpStatus,description} = item ;
    return {name:description,value:ffpStatus,disabled:false} ;
}
function _convertEquipment(item){
    let {code,description} = item ;
    return {name:description,value:code,disabled:false} ;
}
function _dealDBOptionData(list,dbList,fn){
    if(dbList==null){
        return ;
    }
    for(let item of dbList){
        list.push(fn(item)) ;
    }
}

