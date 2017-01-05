<template>
   <input type="text"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="handleInputOper"
      />
</template>
<script>
  export default {
    props:{
      value:[String,Number],
      placeholder:String,
    },
    methods:{
      handleInputOper(event){
        let value = event.target.value ;
        this.$emit('input',value) ;
      }
    }
  } ;
</script>
