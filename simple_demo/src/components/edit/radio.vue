<template>
  <span>
    <label class="radio-inline" v-for="item in options">
      <input type="radio"
        :name="name"
        :value="item.value"
        :checked="item.value === value"
        @click="handleSelectItem"
        /> {{item.name}}
    </label>
  </span>
</template>
<script>
  export default {
    props:{
      options:Array,
      name:String,
      value:[String,Number]
    },
    methods:{
      handleSelectItem(event){
        var val = event.target.value ;
        this.$emit('input',val) ;
      }
    }
  } ;
</script>
