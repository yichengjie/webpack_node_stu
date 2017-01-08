<template>
  <div class="main-content">
    <TodoList
      :list="list"
      :clickTr="clickTr"/>
    <TodoEdit :formData="formData"
      :newAddUser="newAddUser"
      :updateUser="updateUser" />
  </div>
</template>
<script>
  import TodoList from './todo-list.vue' ;
  import TodoEdit from './todo-eidt.vue' ;
  import {queryUserList,addUser} from './api.js' ;
  import _ from 'lodash' ;
  export default {
    components:{
      TodoList,
      TodoEdit
    },
    data(){
      return {
        list:[],
        formData:{
          id:'',
          firstName:'',
          lastName:'',
          userName:''
        }
      } ;
    },
    mounted(){/*当dom全部渲染到页面上后执行的生命周期回调函数*/
      let promise = queryUserList() ;
      promise.then((userList)=>{
        userList.forEach(item=>this.list.push(item)) ;
      }) ;
    },
    methods:{
      newAddUser(user){/*处理新加用户操作*/
        let id = _.uniqueId('id_') ;
        user.id = id ;
        let newUser = Object.assign({},user) ;
        this.list.push(newUser) ;
        let promise = addUser(newUser) ;
        promise.then((msg) =>{
          console.info('新增用户成功...') ;
        }) ;
      },
      updateUser(user){/*处理更新用户操作*/
        let id = user.id ;
        let tmp = this.list.find(findUserById(id)) ;
        Object.assign(tmp,user) ;
      },
      clickTr(user){
        Object.assign(this.formData,user) ;
      }
    }
  } ;
  function findUserById(id) {
    return function(user){
      return user.id === id;
    }
  }
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
