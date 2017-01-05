// function _updateVisiableData(cp){
//     var flag = _getVisiableFlag(cp) ;
//     cp.visiable = flag ; 
//     if(!flag){//如果隐藏控件
//         cp.resetField() ;
//     }
//     //console.info('cp.label : ' + cp.label , "flag : " + cp.visiable) ;
// }
function _getVisiableFlag(cp){
    //serviceTypeList:Array, //serviceType:String,
    //groupList:Array,//group:String,
    //subGroupList:Array,//subGroup:String
    let serviceTypeList = cp.serviceTypeList ;
    let serviceType = cp.serviceType ;
    let groupList = cp.groupList ;
    let group = cp.group ;
    let subGroupList = cp.subGroupList ;
    let subGroup = cp.subGroup ;
    let flag1 = _checkListContainsStr2(serviceTypeList,serviceType) ;
    //console.info('group flag : ' + flag2) ;
    let flag2 = _checkListContainsStr2(groupList,group) ;
    //console.info('group flag : ' + flag2) ;
    let flag3 = _checkListContainsStr2(subGroupList,subGroup) ;
    //console.info('sub group flag : ' + flag3) ;
    let retFlag = (flag1 && flag2 && flag3) ;
    //console.info('retFlag : ' + retFlag)
    return retFlag ;
}
//主要是为了serviceType判断
// function _checkListContainsStr(list,str){
//     if( (!list) ||list.length==0 ) return true ;
//     if( (!str) || str.trim().length==0 ) return true ;
//     return list.includes(str) ;
// }
//主要是为了group和subGroup判断
function _checkListContainsStr2(list,str){
    if( (!list) ||list.length==0 ) return true ;
    //list存在的情况下str必须的存在,这个与上面的判断serviceType不一样需要注意
    //console.info('222222222222222222') ;
    if( (!str) || str.trim().length==0 ) return false ;
    return list.includes(str) ;
}

export default {
     props: {
        serviceTypeList:Array,
        serviceType:String,
        groupList:Array,
        group:String,
        subGroupList:Array,
        subGroup:String
     },
     data(){
         return {
              visiable:true/*是否可见，如果控件不可见，对应的字段value将会被清空**/
         } ;
     },
     methods:{
         _updateVisiableData(){
              var cp = this ;
              var flag = _getVisiableFlag(cp) ;
              cp.visiable = flag ; 
              if(!flag){//如果隐藏控件
                cp.resetField() ;
              }
         }
     },
     watch:{
      serviceType(newVal,oldVal){
         //console.info('serviceType is change ...') ;
         this._updateVisiableData() ;
      },
      group(newVal,oldVal){
        //console.info('group is change ...') ;
        this._updateVisiableData() ;
      },
      subGroup(newVal,oldVal){
        //console.info('subGroup is change ...') ;
        this._updateVisiableData() ;
      }
    }
} ;


