require('lib/is-loading/index.js') ;
var util = {};
var defaultPageSize = 15  ;

util.getJspPageParam=function(){
  var carrCode = "" ;
  var contextPath = "" ;
  var action = "" ;
  var id = "" ;
  return {carrCode,contextPath,action,id} ;
}
util.showLoading = function(){
  $.isLoading({
          'text': "请稍候..." ,
          'class': "text-success glyphicon glyphicon-refresh",
          'tpl': '<span class="isloading-wrapper %wrapper%">%text%<i class="%class% icon-spin marginL5"></i></span>'
      });
}
util.hideLoading = function(){
    $.isLoading("hide");
}

util.getInitPageBeanModel = function (){
	  var pageBean = {
			list:[],
			pagebar:{
				"curPage":1,
				"pageSize":defaultPageSize,
				"pgArr":[],
				"pageCount":0,
				"recordCount":0,
				"isQueryDB":false/*是否从数据中查询的数据，有可能是页面上的排序获得*/
			}
		}
		return pageBean ;
}

//将后台的PageBeanModel转化为前台需要的PageBean
util.convertPageBeanModelToPageBean = function(pageBeanModel){
   let list = pageBeanModel.recordList ; //将更新数据
   let pgArr = pageBeanModel.pageNumList ;
   let {curPage,pageSize,pageCount,recordCount}  = pageBeanModel ;
   let isQueryDB = true ;
   let pagebar = {curPage,pageSize,pgArr,pageCount,recordCount } ;
   let pageBean = {list,pagebar} ;
   return pageBean ;
}

//后台PageBeanModel的数据格式
util.assamblePageBean = function(curPage, pageSize, recordCount, recordList) {
    let PAGESIZE_DEFAULT = 15 ;
    let pb = {} ;
    //起始页--页码
		let starPageNum = 0 ;
		//结束页--页码
		let endPageNum = 0 ;
		//上一页 --页码
		let prePageNum = 0 ;
		//下一页--页码
		let nextPageNum = 0 ;
		//处理一下如果查询到的记录为空的清空
		if(recordCount<1){
      pb.pageSize = PAGESIZE_DEFAULT ;
      pb.curPage = 0 ;
      pb.pageCount = 0 ;
      pb.recordCount = 0 ;
      pb.recordList = [] ;
      pb.prePageNum = 0 ;
      pb.nextPageNum = 0 ;
      pb.starPageNum = 0 ;
      pb.endPageNum = 0 ;
			return pb ;
		}
    if(curPage<1){
			curPage = 1 ;
		}
		if(pageSize<1){
			pageSize = PAGESIZE_DEFAULT ;
		}
		if(recordCount<1){
			recordCount = 0 ;
		}
		// 计算总页码
    let tmp = (recordCount + pageSize - 1) / pageSize ;
		let pageCount = parseInt(tmp) ;
		if (curPage * pageSize > recordCount) {
			curPage = pageCount;
		}
    // 计算 beginPageIndex 和 endPageIndex
		// >> 总页数不多于5页，则全部显示
		if (pageCount <= 5) {
			starPageNum = 1;
			endPageNum = pageCount;
		}else {// >> 总页数多于5页，则显示当前页附近的共5个页码
			// 当前页附近的共5个页码（前2个 + 当前页 + 后2个）
			starPageNum = curPage - 2;
			endPageNum = curPage + 2;
			// 当前面的页码不足3个时，则显示前5个页码
			if (starPageNum < 1) {
				starPageNum = 1;
				endPageNum = 5;
			}
			// 当后面的页码不足2个时，则显示后5个页码
			if (endPageNum > pageCount) {
				endPageNum = pageCount;
				starPageNum = pageCount - 5 + 1;
			}
		}
    //计算上一页
		prePageNum = curPage -1 ;
		if(prePageNum<=0){
			prePageNum = 1 ;
		}
		//计算下一页的页码
		nextPageNum = curPage +1 ;
		if(nextPageNum >pageCount){
			nextPageNum = pageCount ;
		}
		pb.pageSize = pageSize ;
		pb.curPage = curPage ;
		pb.pageCount = pageCount ;
		pb.recordCount = recordCount ;
		pb.recordList = recordList ;
		pb.prePageNum = prePageNum ;
		pb.nextPageNum =  nextPageNum;
		pb.starPageNum = starPageNum ;
		pb.endPageNum =  endPageNum;
    let pageNumList = [] ;
		for (let i = starPageNum; i <=endPageNum; i++) {
			pageNumList.push(i) ;
		}
		pb.pageNumList = pageNumList;
		return pb ;
}


//这种导出只能使用es6的import才能导入
export default util ;
//下的方式既可以使用require导出也可以使用es6的import导入
//module.exports = util ;
