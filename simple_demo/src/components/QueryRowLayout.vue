<template>
  <div class="query_row">
      <span class="query_title" v-if="title">{{title}}</span>
      <slot></slot>
  </div>
</template>
<script>
  export default {
    props:{
      title:String
    }
  } ;
</script>
