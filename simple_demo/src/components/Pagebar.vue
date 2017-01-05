<template>
  <div class="clearfix" >
    <nav class ="pull-right" >
        <ul class="pagination" style="margin:0;">
            <li>  <a href="javascript:void(0)" @click ="toPage(1)">首页</a></li>
            <li>
                <a href="javascript:void(0)" aria-label="Previous" @click ="toPerviousPage">上一页</a>
            </li>
            <li v-for="l in pageBean.pagebar.pgArr"    :class="{ 'active': pageBean.pagebar.curPage==l}" >
                <a href="javascript:void(0)"  @click="toPage(l)">{{l}}</a>
            </li>
            <li v-if ="pageBean.pagebar.pageCount>5&& ((pageBean.pagebar.curPage+3) <=pageBean.pagebar.pageCount)"><span>...</span></li>
            <li>
                <a href="javascript:void(0)" aria-label="Next" @click ="toNextPage">下一页</a>
            </li>
            <li><a href="javascript:void(0)" v-on:click ="toPage(pageBean.pagebar.pageCount)">末页</a></li>
        </ul>
        <div class="page-desc" style="padding-top: 0px;padding-bottom:0px">
           <span class="marginRight10">共<span class ="marginRL2">{{pageBean.pagebar.pageCount}}</span>页</span>
           <span class ="">当前第</span>
           <input type="text" :value ="pageBean.pagebar.curPage" ref= "pageBarInputCurrentPage"
                class ="common_input"  style="width: 30px"   >
           <span class="marginRight5 ">页</span>
           <span>显示
                <select class="pagesize" :value ="pageBean.pagebar.pageSize" @change ="changePageSize">
                    <option value="10">10条</option>
                    <option value="15">15条</option>
                    <option value="20">20条</option>
                    <option value="25">25条</option>
                    <option value="30">30条</option>
                    <option value="50">50条</option>
                    <option value="100">100条</option>
                </select>
          </span>
          <span class="page-ok" v-on:click ="pageConfirm">确定</span>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  props:{
    pageBean:Object,
    queryDB:Function
  },
  methods:{
    //当总页数大于5，并且当前页 +3 小于等于 总页数时
    _queryDB(){
      this.queryDB && this.queryDB() ;
    },
    toPage(num) {
      this.pageBean.pagebar.curPage = Number(num) ;
      this._queryDB() ;
    },
    toPerviousPage() {
      if(this.pageBean.pagebar.curPage*1>1){//触发查询操作
        let toPageNum = this.pageBean.pagebar.curPage*1 -1 ;
        this.toPage(toPageNum) ;
      }
    },
    toNextPage(){
      if(this.pageBean.pagebar.curPage*1<this.pageBean.pagebar.pageCount*1){//触发查询操作
          let toPageNum = this.pageBean.pagebar.curPage*1 +1;
          this.toPage(toPageNum) ;
      }
    },
    changePageSize(event){
      var pagesize = Number(event.target.value) ;
      this.pageBean.pagebar.pageSize = pagesize ;
    },
    pageConfirm(){
      var value = this.$refs.pageBarInputCurrentPage.value ;
       if(!isNaN(value)){//如果是数字
          let pageOkInputNum = value *1 ;
          if(pageOkInputNum>0&&pageOkInputNum<=this.pageBean.pagebar.pageCount*1){
              this.toPage(pageOkInputNum) ;
          }else{
              this.$refs.pageBarInputCurrentPage.value =  this.pageBean.pagebar.curPage ;
          }
      }else{
          this.$refs.pageBarInputCurrentPage.value =  this.pageBean.pagebar.curPage ;
      }
    }
  }
} ;
</script>
<style>
  nav .pagination{
    margin: 0px;
  }
</style>
