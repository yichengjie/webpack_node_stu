<template>
<span>
  <label v-for ="item in options">
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

