//查询数据库的api
import {orderListData,random} from '../common/index.js' ;
import _ from 'lodash_lib' ;
import {QUERYDB_API,BATCHIMPORT_API,BATCHABORT_API,BATCHPUBLISH_API,BATCHDELETE_API} from './api-name.js' ;
var util = require('util_lib') ;
let api = {
    [QUERYDB_API] (queryParam){
    	util.showLoading() ;
        //console.info('查询参数 : ' ,queryParam) ;
        let {curPage,pageSize,orderName,isAsc} = queryParam ;
        let records7List = [] ;
        //生成0-5的随机数
        let r = random(1,9) ;
        let min = curPage *10 ;//toPageNum
        let r2 = random(min ,min +pageSize) ;
        let r3 = random(1,2)  ;
        let r4 = random(1,5)  ;
        let r5 = random(100,99999)  ;
        
        for(let i = 0 ; i < pageSize ; i ++){
            let xxStatus = r3()+"" ;
            let xxStatusDes = r4()+"" ;
            let xxSequenceNumber = r5() +"" ;
            //let cur = _.random(0, 5);
            let id = _.uniqueId("s7Id-") ;
            let s5DescrbeInfo = "test tooltip ["+i+"]" ;
            let obj = {"id":id,"subcode":"OB"+ r(),"serviceType":"F"+ r(),"sequenceNumber":xxSequenceNumber,"status": xxStatus,"statusDes":xxStatusDes, "saleStartDate":"2016/01/0"+ r(),
                    "saleEndDate":"2016/12/2"+ r(),"travelStartDate":"2016/01/0"+ r(),"travelEndDate":"2016/12/2"+ r(),
                    "loc1":"11"+ r(),"loc2":"1234567"+ r(),"flyerStatus":""+ r(),"money":"99"+ r(),"moneyUnit":"CNY","descr":"描述" + r(),
                    "lastUpdateUser":"yicj"+ r(),"lastUpdateDate":"2016/01/01 14:0"+ r(),"s5DescrbeInfo":s5DescrbeInfo
            } ;
            records7List.push(obj) ;
        }

        orderListData(records7List,orderName,isAsc) ;
        var pageBean = {
            curPage:curPage,
            pageSize:pageSize,
            pageNumList:[1,2,3,4,5],
            pageCount:5,
            recordList:records7List,
            recordCount:100
        } ;
        //loading() ;
        return new Promise(function(resolve,reject){
            let waitTimeNum = 2000 ;
            setTimeout(function(){
            	util.hideLoading() ;
                //hiding() ;
                resolve({pageBean,flag:true}) ;
            },waitTimeNum) ;
        }) ;
    },
    [BATCHIMPORT_API](){
        return new Promise(function(resolve,reject){
            let waitTimeNum = 2000 ;
            let retSuccessData = {flag:true,"msg":["导入成功,1秒后将关闭窗口..."]} ;
            let retErrorData = {
                flag:false,
                msg:[ '错误提示信息 : ',
                    '- 错误信息1',
                    '- 错误信息2',
                    '- 错误信息3',
                    '- 错误信息4',
                    '- 错误信息5',
                    '- 错误信息6']
            } ;
            setTimeout(function(){
                //hiding() ;
                resolve(retSuccessData) ;
                //resolve(retErrorData) ;
            },waitTimeNum) ;
        }) ;
    },
    [BATCHABORT_API](){
        return new Promise(function(resolve,reject){
            let waitTimeNum = 2000 ;
            let retSuccessData = {flag:true,msg:['导入成功1秒后关闭窗口!']} ;
            let retErrorData = {flag:false,msg:['错误提示信息 :',"- 错误提示1","- 错误提示2"]} ;
            setTimeout(()=>{
                //resolve(retSuccessData) ;
                resolve(retErrorData) ;
            },waitTimeNum) ;
        }) ;
    },
    [BATCHPUBLISH_API](){
        return new Promise(function(resolve,reject){
            let waitTimeNum = 2000 ;
            let retSuccessData = {flag:true} ;
            let retErrorData = {flag:false} ;
            setTimeout(()=>{
                //resolve(retSuccessData) ;
                resolve(retErrorData) ;
            },waitTimeNum) ;
        }) ; 
    },
    [BATCHDELETE_API](){
        return new Promise(function(resolve,reject){
            let waitTimeNum = 2000 ;
            let retSuccessData = {flag:true} ;
            let retErrorData = {flag:false} ;
            setTimeout(()=>{
                //resolve(retSuccessData) ;
                resolve(retErrorData) ;
            },waitTimeNum) ;
        }) ; 
    }
} ;

export default api ;