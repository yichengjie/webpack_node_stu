<template>
  <div class="main-content">
    <QueryCondation :formData="formData"/>
    <EditForm :formData="formData" :options="options"/>
  </div>
</template>
<script>
  import EditForm from './EditForm.vue' ;
  import QueryCondation from './QueryCondation.vue' ;
  export default {
    components:{
      EditForm,
      QueryCondation
    },
    data() {
      return {
        formData:{
          name:'',
          addr:'',
          dayofweek:[],
          dept:'',
          classes:'',
          classes2:''
        },
        options:{
          dayofweek:[{name:'周一',value:'1'},{name:'周二',value:'2'},{name:'周三',value:'3'},{name:'周四',value:'4'},{name:'周五',value:'5'}],
          dept:[{name:'java',value:'java'},{name:'js',value:'js'},{name:'c',value:'c'}],
          classes:[{name:'选择',value:''},{name:'101班',value:'101'},{name:'102班',value:'102'},{name:'103班',value:'103'}]
        }
      } ;
    }
  } ;
</script>
<style>
  .main-content{
    margin: 0px;
  }
</style>
