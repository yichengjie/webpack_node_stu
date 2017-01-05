<template>
  <div class="form-group">
      <label  class="col-sm-2 control-label" v-if="label">{{label}}</label>
      <div class="col-sm-5">
        <slot></slot>
      </div>
  </div>
</template>
<script>
  export default {
    props:{
      label:String
    }
  } ;
</script>

