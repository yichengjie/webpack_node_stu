// actions are functions that causes side effects and can involve
// asynchronous operations.
import {UPDATE_INPUT_PAGEBAR,QUERYLIST_FOR_PAGE,UPDATE_SIMPLE_STATE,
    ORDER_LISTDATA,UPDATE_TABLETITLE_ORDER,CLEAR_TABLETITLE_ORDERINFO,
    UPDATE_FORMDATA_ARRAY,UPDATE_FORMDATA_SIMPLE,UPDATE_SINGLE_CHECKEDIDARR,
    UPDATE_ALL_CHECKEDIDARR,BATCH_DELETE_RECORDS7,BATCH_ABORT_RECORDS7} from './mutation-types.js' ;
import api from '../api/index.js' ;
let _initTooltip = function(){
	setTimeout(function(){
       $("[data-toggle='tooltip']").tooltip();
	},300) ;
	return true ;
} ;

const actions = {
   updatePageBar({commit},payload){
      commit(UPDATE_INPUT_PAGEBAR,payload) ;
   },
   queryList4Page({commit},queryParam){
       let promise = api.queryDbApi(queryParam) ;
       promise.then(function(retData){
           commit(QUERYLIST_FOR_PAGE,retData.pageBean) ;
           _initTooltip() ;
       },function(err){
           console.info('查询出错!') ;
       }) ;
   },
   updateSimpleState({commit},payload){
       commit(UPDATE_SIMPLE_STATE,payload) ;
   },
   orderListData({commit},payload){
       commit(ORDER_LISTDATA,payload) ;
   },
   updateTableTitleOrder({commit},payload){
       commit(UPDATE_TABLETITLE_ORDER,payload) ;
   },
   clearTableTitleOrderInfo({commit}){
       commit(CLEAR_TABLETITLE_ORDERINFO) ;
   },
   updateFormDataArrData({commit},payload){
       commit(UPDATE_TABLETITLE_ORDER,payload) ;
   },
   updateFormDataArray({commit},payload){
       commit(UPDATE_FORMDATA_ARRAY,payload) ;
   },
   updateFormDataSimple({commit},payload){
       commit(UPDATE_FORMDATA_SIMPLE,payload) ;
   },
   updateSingleCheckedArr ({commit},payload){
       commit(UPDATE_SINGLE_CHECKEDIDARR,payload) ;
   },
   updateAllCheckedArr ({commit},checkedFlag){
       commit(UPDATE_ALL_CHECKEDIDARR,checkedFlag) ;
   },
   batchDeleteRecords7({commit}){//批量删除
       commit(BATCH_DELETE_RECORDS7) ;
   },
   batchAbortRecords7({commit},abortDateTimeInput){
       commit(BATCH_ABORT_RECORDS7,abortDateTimeInput) ;
   }
} ;

export default actions ;
