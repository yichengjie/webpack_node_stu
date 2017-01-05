<template>
    <div id="app">
        <h1>hello world 2</h1>
    </div>
</template>
<script>
    import HttpClient from './common/HttpClientUtil.js'  ;
    export default {
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