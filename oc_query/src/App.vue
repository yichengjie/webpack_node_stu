<template>
    <div>
        <Navbar active-name = "附加服务"/>
        <QuerySection/>
        <div class="container-fluid main_content" style="margin-top:10px;" >
            <ResultDescribe/>
            <Operbar />
            <TableList />
            <Pagebar/>
        </div>
    </div>
</template>
<script>
    import Navbar from './components/Navbar.vue' ;
    import QuerySection from './components/QuerySection.vue' ;
    import Operbar from './components/Operbar.vue' ;
    import TableList from './components/TableList.vue' ;
    import Pagebar from './components/Pagebar.vue' ;
    import ResultDescribe from './components/ResultDescribe.vue' ;
    import { mapGetters, mapActions } from 'vuex' ;
    export default{
        name:'app',
        components:{
            Navbar,
            QuerySection,
            Operbar,
            TableList,
            Pagebar,
            ResultDescribe
        }
    }
</script>
<style scoped>
   body{
     min-width: 1300px;
   }
   .header-container{
       height:54px;
   }
</style>