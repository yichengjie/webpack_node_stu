<template>
    <tr>
          <td>{{index +1}}</td>
          <td>{{item.firstName}}</td>
          <td>{{item.lastName}}</td>
          <td>{{item.userName}}</td>
          <td class="oper_column">
              <i class="glyphicon glyphicon-pencil" @click.stop ="handleClickTrOper(item)"></i>
              <i class="glyphicon glyphicon-trash text-danger"  @click.stop="handleDeleteUser(item.id)"></i>
          </td>
    </tr>
</template>
<script>
    export default {
      props:{
        index:Number,
        item:Object,
        clickTr:Function,
        handleDeleteUser:Function
      },
      methods:{
          handleClickTrOper(item){
              this.clickTr(item) ;
          }
      }
    } ;
</script>
<style>
    .oper_column i{
        cursor: pointer ;
    }
</style>