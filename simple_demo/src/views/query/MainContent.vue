<template>
  <div class="main-content">
      <QueryCondation :queryDB="queryDB" :formData="formData" />
      <QueryList :pageBean="pageBean" :queryDB = "queryDB"/>
  </div>
</template>
<script>
  import QueryCondation from './QueryCondation.vue' ;
  import QueryList from './QueryList.vue' ;
  import util from 'common/util.js' ;
  import {queryDBApi} from './api.js' ;
  let defaultPageSize = 10 ;
  export default {
    name:'MainContent',
    components:{
       QueryCondation,
       QueryList
    },
    methods:{
      queryDB(){/**当点击查询按钮后，查询数据库操作*/
        util.showLoading() ;
        //清空页面上一次查询的数据
        this.pageBean.list.splice(0,this.pageBean.list.length) ;
        let queryParam = {...this.pageBean.pagebar,...this.formData} ;
        let promise = queryDBApi(queryParam) ;
        promise.then((retData) => {
          util.hideLoading() ;
          this.pageBean.list = retData.list ; //将更新数据
          Object.assign(this.pageBean.pagebar,retData.pagebar) ;
        }) ;
      }
    },
    data () {
      return {
        formData:{
          status1:[],
          subcode1:'',
          subcode1:'',
          seqNum1:'',
          seqNum2:''
        },
        pageBean:{
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
      } ;
    },
    mounted(){
      console.info('hello world ... ') ;
      this.$on('test',function(msg){
        console.info('test ... ' + msg) ;
      }) ;
    }
  };
</script>
<style>
  .main-content{
    margin: 0px;
  }
</style>
