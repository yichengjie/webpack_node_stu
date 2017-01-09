<template>
  <div class="main-content">
    <QueryForm :queryCondation="queryCondation" />
    <TodoList
      :list="getFilterList"
      :clickTr="clickTr"
      :handleDeleteUser="handleDeleteUser"
      :queryDB="queryDB"
      :pageBean="pageBean"/>
    <TodoEdit :formData="formData"
      :newAddUser="newAddUser"
      :updateUser="updateUser" />
  </div>
</template>
<script>
  import TodoList from './todo-list.vue' ;
  import TodoEdit from './todo-eidt.vue' ;
  import QueryForm from './query-form.vue' ;
  import MainContentBusi from './MainContentBusi.js' ;
  import util from 'common/util.js' ;
  let pageBeanModel = util.getInitPageBeanModel() ;
  export default {
    components:{
      TodoList,
      TodoEdit,
      QueryForm
    },
    data(){
      return {
        list:[],
        formData:{
          id:'',
          firstName:'',
          lastName:'',
          userName:''
        },
        queryCondation:{
          firstName:'',
          lastName:'',
          userName:''
        },
        //pageBean:Object.assign({},pageBeanModel)
        pageBean:{
          list:[],
          pagebar:{
            "curPage":1,
            "pageSize":15,
            "pgArr":[],
            "pageCount":0,
            "recordCount":0,
            "isQueryDB":false/*是否从数据中查询的数据，有可能是页面上的排序获得*/
          }
        }
      } ;
    },
    mounted(){/*当dom全部渲染到页面上后执行的生命周期回调函数*/
      MainContentBusi.fetchAllUserList(this) ;
    },
    computed:{/*计算属性*/
      getFilterList(){
         return MainContentBusi.getFilterList(this) ; 
      }
    },
    methods:{
      newAddUser(user){/*处理新加用户操作*/
        MainContentBusi.newAddUser(user,this) ;
      },
      updateUser(user){/*处理更新用户操作*/
        MainContentBusi.updateUser(user,this) ;
      },
      handleDeleteUser(id){
        MainContentBusi.handleDeleteUser(id,this) ;
      },
      clickTr(user){
        Object.assign(this.formData,user) ;
      },
      queryDB(){//查询方法传递给pageBar使用
         console.info('query db method will to execute ...') ;
         MainContentBusi.fetchAllUserList(this) ;
      }
    }
  } ;
</script>
<style>
  .main-content{
    margin: 0px;
  }
  .todo-list{
    width: 60%;
    float: left;
    box-sizing: border-box ;
    padding: 20px 50px;
  }
  .todo-edit{
    width: 40%;
    float: left;
    box-sizing: border-box ;
    padding: 20px 20px 20px 0 ;
  }
</style>
