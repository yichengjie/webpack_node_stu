<template>
    <div id="app">
        <h1>hello world 2 </h1>
        <Hello/>
    </div>
</template>
<script>
    import Hello from './components/Hello.vue' ;
    import HttpClient from './common/HttpClientUtil.js'  ;
    export default {
        name:'App',
        components:{
            Hello
        },
        mounted() {
           console.info('hello world ...') ;
           var url = "/api/hello" ;
           var promise = HttpClient.dealAjaxRequestWithoutParam(url) ;
           promise.then((retData)=>{
               console.info('retData : ' ,retData) ;
           },(error)=>{
               console.error('error : ' ,error) ;
           }) ;
        }
    } ;
</script>