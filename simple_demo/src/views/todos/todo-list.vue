<template>
  <div class="todo-list">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" @click ="handleClickTrOper(item)">
          <td>{{index +1}}</td>
          <td>{{item.firstName}}</td>
          <td>{{item.lastName}}</td>
          <td>{{item.userName}}</td>
        </tr>
      </tbody>
    </table>
 </div>
</template>
<script>
  export default {
    props:{
      list:Array,
      clickTr:Function
    },
    methods:{
      handleClickTrOper(item){
        this.clickTr(item) ;
      }
    }
  } ;
</script>
