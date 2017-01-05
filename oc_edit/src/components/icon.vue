<template>
  <i :class="'el-icon-' + name"></i>
</template>
<script>
  export default {
    name: 'oc-icon',
    props: {
      name: String
    }
  };
</script>
