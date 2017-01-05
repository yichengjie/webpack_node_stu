<template>
  <span>
    <label  class="marginR5 title" v-if="label">{{label}}</label>
    <input type="text"
      name="subcode"
      class="common_input"
      :style="inputStyleObj"
      :value="value"
      @input="handleInputOper"
      :placeholder="placeholder" />
  </span>
</template>
<script>
  export default {
    props:{
       label:String,
       name:String,
       placeholder:String,
       width:{
         type:String,
         default:"120px"
       },
       value:[String,Number]
    },
    data () {
      return {
        inputStyleObj:{
          width:this.width
        }
      } ;
    },
    methods:{
      handleInputOper(event) {
        let value = event.target.value ;
        this.$emit('input',value) ;
      }
    }
  } ;
</script>
