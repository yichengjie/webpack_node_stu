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
    methods:{
      newAddUser(user){/*处理新加用户操作*/
        let id = _.uniqueId('id_') ;
        user.id = id ;
        this.list.push({...user}) ;
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
