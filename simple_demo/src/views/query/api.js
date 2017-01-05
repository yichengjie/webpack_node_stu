import util from 'common/util.js' ;
//查询数据库
export function queryDBApi (queryParam) {
  console.info('queryParam : ' + JSON.stringify(queryParam)) ;
  //这一部分是通过数据库查询过来的数据
  let recordList =[
      {id:'001',name:'ocName01',classes:'101',dept:'js'},
      {id:'001',name:'ocName02',classes:'101',dept:'js'},
      {id:'001',name:'ocName03',classes:'101',dept:'js'}
  ] ;
  let toPage = queryParam.curPage ;
  let pageSize = queryParam.pageSize ;
  let recordCount = 135 ;
  let pageBeanDB = util.assamblePageBean(toPage, pageSize, recordCount, recordList) ;
  //将数据库返回来的PageBean对象解析
  let pagebar = {
    "curPage":pageBeanDB.curPage,
    "pageSize":pageBeanDB.pageSize,
    "pgArr":pageBeanDB.pageNumList,
    "pageCount":pageBeanDB.pageCount,
    "recordCount":pageBeanDB.recordCount,
    "isQueryDB":true
  } ;
  let retData = {list:pageBeanDB.recordList,pagebar} ;
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(retData) ;
    },300) ;
  }) ;
}
