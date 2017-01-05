import {UPDATE_INPUT_PAGEBAR,QUERYLIST_FOR_PAGE,UPDATE_SIMPLE_STATE,
    ORDER_LISTDATA,UPDATE_TABLETITLE_ORDER,CLEAR_TABLETITLE_ORDERINFO,
    defaultOrderFlag,UPDATE_FORMDATA_ARRAY,UPDATE_FORMDATA_SIMPLE,
    UPDATE_SINGLE_CHECKEDIDARR,UPDATE_ALL_CHECKEDIDARR,BATCH_DELETE_RECORDS7,
    BATCH_ABORT_RECORDS7} from './mutation-types.js' ;
import {orderListData} from '../common/index.js' ;

function _formatSpecialDateStr(dataStr){
    return _.replace(dataStr, /-/g, '/') ;
}
function _getStatusShow (statusDes) {
    var result = '';
    if (statusDes === '1') {
        result = '未发布';
    } else if (statusDes === '2') {
        result = '未生效';
    } else if (statusDes === '3') {
        result = '已生效';
    }else if (statusDes === '4') {
        result = '已过期';
    }else if (statusDes === '5') {
        result = '已取消';
    }
    return result;
}


const mutations = {
  [UPDATE_INPUT_PAGEBAR] (state,pageBar ) {
      Object.assign(state.pageBar,pageBar) ;
  },
  [QUERYLIST_FOR_PAGE](state,pageBean){
      let vmPageBar = state.pageBar ;
      vmPageBar.curPage = pageBean.curPage ;
      vmPageBar.pageSize= pageBean.pageSize;
      vmPageBar.pageCount = pageBean.pageCount;
      vmPageBar.recordCount = pageBean.recordCount ;
      vmPageBar.pgArr = pageBean.pageNumList ;
      vmPageBar.isQueryDB = true ;
      state.dealPageOrderFlag = false;//是否进行过页面排序
      state.records7List.splice(0,state.records7List.length) ;
      let list = pageBean.recordList ;
      list.forEach(function(item){
          let saleStartDateShow = _formatSpecialDateStr(item.saleStartDate) ;
          let saleEndDateShow = _formatSpecialDateStr(item.saleEndDate) ;
          let statusShow = _getStatusShow(item.statusDes) ;
          let sequenceNumber = item.sequenceNumber*1 ;
          let obj = {saleStartDateShow,saleEndDateShow,statusShow,sequenceNumber} ;
          let newObj = Object.assign({},item,obj) ;
          state.records7List.push(newObj) ;
      }) ;
  },
  [UPDATE_SIMPLE_STATE](state,payload){
      Object.assign(state,payload) ;
  },
  [ORDER_LISTDATA](state,payload){
      let list = state.records7List ;
      let {titleName,ascFlag} = payload ;
      orderListData(list,titleName,ascFlag) ;
  },
  [UPDATE_TABLETITLE_ORDER](state,payload){
      let keys = Object.keys(state.tableTitleOrder) ;
      for(let key of keys){
          state.tableTitleOrder[key] = defaultOrderFlag ;
      }
      Object.assign(state.tableTitleOrder,payload) ;
  },
  [CLEAR_TABLETITLE_ORDERINFO](state){
      state.orderTitleName = '' ;
      let keys = Object.keys(state.tableTitleOrder) ;
      for(let key of keys){
          state.tableTitleOrder[key] = defaultOrderFlag ;
      }
  },
  [UPDATE_FORMDATA_ARRAY](state,payload){
      let {checkedFlag,fieldName,fieldValue} = payload ;
      if(checkedFlag){
          state.formData[fieldName].push(fieldValue) ;
      }else{
          let index =  state.formData[fieldName].findIndex(function(value) {
            return value == fieldValue;
          }) ;
          //console.info('index : ' + index) ;
          state.formData[fieldName].splice(index,1) ;
      }
  },
  [UPDATE_FORMDATA_SIMPLE](state,payload){
       Object.assign(state.formData,payload) ;
  },
  [UPDATE_SINGLE_CHECKEDIDARR](state,payload){
       let {checkedFlag,id} = payload ;
       if(checkedFlag){
           state.checkedIdArr.push(id) ;
       }else{
           let index =  state.checkedIdArr.findIndex(function(value) {
            return value == id;
           }) ;
           state.checkedIdArr.splice(index,1) ;
       }
  },
  [UPDATE_ALL_CHECKEDIDARR](state,checkedFlag){
       state.checkedIdArr.splice(0,state.checkedIdArr.length) ;
       if(checkedFlag){
           for(let item of state.records7List){
               state.checkedIdArr.push(item.id) ;
           }
       }
  },
  [BATCH_DELETE_RECORDS7](state){//批量删除数据
      let delCount = state.checkedIdArr.length ;
      for(let id of state.checkedIdArr){
          let index =  state.records7List.findIndex(function(item) {
            return item.id == id;
          }) ;
          if(index!=-1){
            state.records7List.splice(index,1) ;  
          }
      }
      state.checkedIdArr.splice(0,state.checkedIdArr.length) ;
      //全选checkbox置为不选中状态
      state.checkAllRecords7Flag = false;
      state.pageBar.recordCount = state.pageBar.recordCount - delCount ;
  },
  [BATCH_ABORT_RECORDS7](state,abortDateTimeInput){
      for(let id of state.checkedIdArr){
         for(let item of state.records7List){
            if(item.id === id){
                item.saleEndDate = abortDateTimeInput ;
                item.saleEndDateShow= _formatSpecialDateStr(abortDateTimeInput) ;
            }
         }
      }
      //checkbox的状态改变
      state.checkedIdArr.splice(0,state.checkedIdArr.length) ;
      state.checkAllRecords7Flag = false;
  }
};
export default mutations ;