<template>
  <div class="main-content">
    <TodoList
      :list="list"
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
  import UserOperApi from './api.js' ;
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
      let promise = UserOperApi.queryUserList() ;
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
        let promise = UserOperApi.addUser(newUser) ;
        promise.then((msg) =>{
          console.info('新增用户成功...') ;
        }) ;
      },
      updateUser(user){/*处理更新用户操作*/
        let id = user.id ;
        let newUser = Object.assign({},user) ;
        //更新页面上的用户信息
        let promise = UserOperApi.updateUser(newUser) ;
        promise.then(msg=>{
           
        }) ;
        let tmp = this.list.find(findUserById(id)) ;
        Object.assign(tmp,user) ;
      },
      handleDeleteUser(id){
        let promise = UserOperApi.deleteUserById(id) ;
        promise.then(msg=>{
           console.info('删除用户成功...')
           let newUserList = this.list.filter(item1=>{
             return item1.id !== id ;
           }) ; 
           this.list.splice(0) ;
           newUserList.forEach(item2=>{
             this.list.push(item2) ;
           }) ;
        }) ;
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
