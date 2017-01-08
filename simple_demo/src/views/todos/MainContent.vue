<template>
  <div class="main-content">
    <QueryForm :queryCondation="queryCondation" />
    <TodoList
      :list="getFilterList"
      :clickTr="clickTr"
      :handleDeleteUser="handleDeleteUser"/>
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
