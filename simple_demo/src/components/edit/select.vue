<template>
  <select :name="name"
      class="form-control"
      :value ="value"
      @change="handleChangeOper">
    <option v-for="item in options"
      :value="item.value"
      >{{item.name}}</option>
  </select>
</template>
<script>
  export default {
    props:{
      name:String,
      value:[String,Number],
      options:Array
    },
    methods:{
      handleChangeOper(event){
         var val = event.target.value ;
         this.$emit('input',val) ;
      }
    }
  } ;
</script>
