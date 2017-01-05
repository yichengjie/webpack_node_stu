//查询数据库的api
import {orderListData,random} from '../common/index.js' ;
import _ from 'lodash_lib' ;
import {QUERYDB_API,BATCHIMPORT_API,BATCHABORT_API,BATCHPUBLISH_API,BATCHDELETE_API} from './api-name.js' ;
var util = require('util_lib') ;
var httpClient = require('HttpClientUtil_lib') ;
import {toastInfo,toastDanger,toastSuccess,getJspPageParam} from '../common/index.js' ;
var netErrTip = "网络故障查询出错!" ;

let api = {
    [QUERYDB_API] (queryParam){//查询api
    	//console.info('**********',queryParam) ;
    	let {carrCode,contextPath} = getJspPageParam() ;
		var serverUrl = contextPath+"/s7/s7Query4Page.action" ;
        let simpleJsonData = Object.assign({},queryParam,{carrCode}) ;
        let ajaxing = httpClient.dealAjaxRequest4JSObj(serverUrl,simpleJsonData) ;
		util.showLoading() ;
        return new Promise(function(resolve,reject){
        	$.when(ajaxing).done(function(retData){
        		util.hideLoading() ;
        		resolve(retData) ;
  		    }).fail(function(err){
  		    	util.hideLoading() ;
        		toastDanger(netErrTip) ;
        		resolve({flag:"false",msg:netErrTip}) ;
  		    }) ;
        }) ;
    },
    [BATCHIMPORT_API](){//批量导入api
    	let {carrCode,contextPath} = getJspPageParam() ;
		var serverUrl = contextPath+"/ocimport/resolve.action";
    	return new Promise(function(resolve,reject){
        	$.ajaxFileUpload({
    			url:serverUrl, //用于文件上传的服务器端请求地址
    			type:'post',
    			formId:'batchImportForm',
    			timeout:100000,
    			secureuri:false, //一般设置为false
    			dataType:'json', //返回值类型 一般设置为json
    			success:function(data, status){
    				let flag = false;
    				let msg = [] ;
            		if(data.flag=='true'|| data.flag==true){
            			flag = true ;
            			msg.push('导入成功,1秒后将关闭窗口...') ;
            		}else{
            			msg = data.errorList ;
            		}
            		resolve({flag,msg}) ;
    			},
    			error:function(xmlHttpRequest, status, error) {
            		toastDanger(netErrTip) ;
            		resolve({flag:"false",msg:netErrTip}) ;
    			}
    		});
        	
        }) ;
    },
    [BATCHABORT_API](idArr,lastMaintenanceDate){//批量截止api
    	let {carrCode,contextPath} = getJspPageParam() ;
		var ids = idArr.join(',') ;
    	var simpleJsonData = {"lastMaintenanceDate":lastMaintenanceDate+":59","ids":ids};
		let serverUrl = contextPath+"/s7/batchObortR7.action" ;
		let ajaxing = httpClient.dealAjaxRequest4SimpleParam(serverUrl,simpleJsonData) ;
    	return new Promise(function(resolve,reject){
        	$.when(ajaxing).done(function(retData){
        		let flag = false;
        		let msg = [] ;
        		if(retData.flag=='true'||retData.flag==true){
        			flag = true ;
        			msg.push('操作成功,1秒后将关闭窗口...') ;
        		}else{
        			msg.push('截止操作失败!') ;
        		}
        		resolve({flag,msg}) ;
  		    }).fail(function(err){
  		    	toastDanger(netErrTip) ;
        		resolve({flag:"false",msg:netErrTip}) ;
  		    }) ;
        }) ;
    },
	[BATCHPUBLISH_API](ids){//批量发布
		let {carrCode,contextPath} = getJspPageParam() ;
		var param = {"s7IdList":ids};
		var serverUrl = contextPath+"/s7/s7publish.action";
		var ajaxing = httpClient.dealAjaxRequest4JSObj(serverUrl,param) ;
        return new Promise(function(resolve,reject){
			$.when(ajaxing).done(function(retData){
				if (retData === 'PUBISHSUCCESS' ) {
					toastSuccess("发布成功!") ;
					resolve({flag:true}) ;
				} else {
					resolve({flag:false}) ;
					toastDanger("发布失败!") ;
				}
			}).fail(function(err){
				toastDanger(netErrTip) ;
				resolve({flag:false}) ;
			}) ;
            
        }) ; 
    },
	[BATCHDELETE_API](idArr){//批量删除
		var param = {"ids":idArr};
		let {contextPath} = getJspPageParam() ;
		let serverUrl = contextPath +"/s7/batchDeleteS7.action" ;
		var ajaxing = httpClient.dealAjaxRequest4SimpleParam(serverUrl,param) ;
        return new Promise(function(resolve,reject){
			$.when(ajaxing).done(function(retData){
				if(retData==="SUCCESS"){
					resolve({flag:true}) ;
					toastSuccess("删除成功!") ;
				}else{
					resolve({flag:false}) ;
					toastDanger("删除操作失败!") ;
				}
			}).fail(function(err){
				toastDanger(netErrTip) ;
				resolve({flag:false}) ;
			}) ;
        }) ; 
    }
} ;

export default api ;