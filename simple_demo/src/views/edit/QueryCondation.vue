<template>
  <div class ="query_section">
    <QueryRowLayout>
        <span class="pull-right marginR15">
            <button type="button" class="btn btn-sm" @click ="handleBackOper">返回</button>
            <button type="button" class="btn btn-sm btn-primary" @click ="handleQueryOper">保存</button>
        </span>
    </QueryRowLayout>
  </div>
</template>
<script>
  import QueryRowLayout from 'components/QueryRowLayout.vue' ;
  export default {
    props:{
      formData:Object
    },
    components:{
      QueryRowLayout
    },
    methods:{
      handleBackOper(){
        console.info('返回上一个页面...') ;
      },
      handleQueryOper(){
        console.info('你点击了保存按钮,表单数据为 : ' + JSON.stringify(this.formData)) ;
        console.info('第一步 : 数据合法性校验') ;
        console.info('第二步 : 发送数据到后台') ;
      }
    }
  } ;
</script>
