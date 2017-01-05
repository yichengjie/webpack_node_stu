<template>
<span>
  <label v-for ="item in options" class="checkbox-inline">
      <input type="checkbox"
        :name="name"
        :checked="isChecked(item.value)"
        @click="handleSelectItem"
        :value ="item.value"/>&nbsp;&nbsp;{{item.name}}
  </label>
</span>
</template>
<script>
  export default {
    props:{
      value:Array,
      name:String,
      options:Array,
      readonly:Boolean
    },
    methods:{
      isChecked(val){
          return this.value.includes(val) ;
      },
      handleSelectItem(event){
        var flag = event.target.checked ;
        var tmp = event.target.value ;
        var newArr = [] ;
        if(flag){
            newArr = [...this.value,tmp] ;
        }else{
            newArr = this.value.filter(function(item){
              return item != tmp ;
            }) ;
        }
        this.$emit('input', newArr);
      }
    }
  } ;
</script>
<style>
 .form-group checkbox-inline{
    font-size: 10px;
    font-weight: 100 ;
  }
</style>
