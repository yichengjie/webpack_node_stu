<template>
  <div class="todo-list">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <ListItem 
          v-for="(item,index) in list"
          :item="item" 
          :index="index"
          :clickTr="clickTr"
          :handleDeleteUser="handleDeleteUser"
        />
      </tbody>
    </table>
 </div>
</template>
<script>
  import ListItem from './todo-list-item.vue' ;
  export default {
    props:{
      list:Array,
      clickTr:Function,
      handleDeleteUser:Function
    },
    components:{
      ListItem
    }
  } ;
</script>
