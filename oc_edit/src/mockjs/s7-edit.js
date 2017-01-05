var contextPath ="/ocgui" ;
var carrCode = "CA" ;
let jsonData = require('../test/s7-edit.json') ;
var Mock = require('mockjs') ;
var initPage4AddUrl = contextPath+'/s7/initPage4Add.action' ;
var initPage4UpdateUrl = contextPath+'/s7/initPage4Update.action' ;
var queryList163Url = contextPath+'/s7/query4ClickService.action' ;

// var initPage4AddUrl = '/api/s7/initPage4Add.action' ;
// var initPage4UpdateUrl = '/api/s7/initPage4Update.action' ;
// var queryList163Url = '/api/s7/query4ClickService.action'


Mock.mock(initPage4AddUrl,function(){
    console.info('我拦截到请求地址['+initPage4AddUrl+'],并返回了模板数据...') ;
    let retData ={
        flag:true ,
        ...jsonData
    };
    return retData ;
});

Mock.mock(initPage4UpdateUrl,function(){
    console.info('我拦截到请求地址['+initPage4UpdateUrl+'],并返回了模板数据...') ;
    let formData = {//2016-10-21 13:45
        firstMaintenanceDate:'',
        serviceType:'A',
        serviceSubCode:'0JJ'
    } ;
    let retData ={
        flag:true ,
        formData,
        ...jsonData
    };
    return retData ;
});

Mock.mock(queryList163Url,function(){
    console.info('我拦截到请求地址['+queryList163Url+'],并返回了模板数据...') ;
    let retData = {
        "tb163List": [
        {
            "id": {
                "tblNo": 1,
                "lineNo": 1
            },
            "recType": 3,
            "action": 2,
            "tblId": 163,
            "carrier": "CA",
            "serviceType": "F",
            "subCode": "BD1",
            "subCodeOccurence": "1",
            "sequenceNumber": 123,
            "lastUpdateDate": "2016-08-03",
            "lastUpdateUser": "CA",
            "commercialName": "优选座位"
        },
        {
            "id": {
                "tblNo": 1,
                "lineNo": 2
            },
            "recType": 3,
            "action": 2,
            "tblId": 163,
            "carrier": "CA",
            "serviceType": "F",
            "subCode": "BD1",
            "subCodeOccurence": "1",
            "sequenceNumber": 123,
            "lastUpdateDate": "2016-08-03",
            "lastUpdateUser": "CA",
            "commercialName": "优选座位2"
        }
      ]
    } ;
    return retData ;
});
//query4ClickService
