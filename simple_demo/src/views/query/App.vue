<template>
    <div id ="app">
        <Navbar />
        <MainContent />
    </div>
</template>
<script>
  require('assets/css/common.css') ;
  import MainContent from './MainContent.vue'
  import Navbar from 'components/Navbar.vue' ;
  export default{
    name: 'App',
    components: {
      MainContent,
      Navbar
    }
  }
</script>
