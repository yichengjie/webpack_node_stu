<template>
  <div class ="query_section">
    <QueryRowLayout title="基础信息">
        <OCCheckbox name ="status1" v-model="formData.status1" :options ="options.status1" />
        <OCInput label="SUBCODE" v-model ="formData.subcode1" width="150px" placeholder="多个用/分割"/>&nbsp;—
        <OCInput v-model ="formData.subcode2" width="150px" placeholder="多个用/分割"/>
        <OCInput label="优先级序号" v-model ="formData.seqNum1" width="80px" />&nbsp;—
        <OCInput v-model ="formData.seqNum2" width="80px" />
        <span class="pull-right marginR15">
            <button type="button" class="btn btn-sm btn-primary" @click ="handleQueryOper">查询</button>
        </span>
    </QueryRowLayout>
  </div>
</template>
<script>
  import QueryRowLayout from 'components/QueryRowLayout.vue' ;
  import OCCheckbox from 'components/query/checkbox.vue' ;
  import OCInput from 'components/query/input.vue' ;
  import Vue from 'vue' ;
  export default {
    components:{
      QueryRowLayout,
      OCCheckbox,
      OCInput
    },
    props:{
      queryDB:Function,
      formData:Object
    },
    data() {
      return {
        options:{
          classes:[{name:'101班',value:'101'},{name:'102班',value:'102'},{name:'103班',value:'103'}],
          status1:[{name:'未发布',value:'1'},{name:'已发布',value:"2"}]
        }
      } ;
    },
    methods:{
      handleQueryOper () {
        this.queryDB() ;
        //console.info(this.$parent) ;
        //.$emit('test','msg is hello world') ;
        //var t = $('#myList')[0].textContent ;
        //console.info('t : ' + t) ;
        // Vue.nextTick( () => {
        //   this.$el.textContent === 'new message' // true
        // }) ;
      }
    }
  };
</script>
<style>
.query-container{
  background-color: #F8F8F8;
  padding: 10px;
  border: 1px solid #D9D9D9;
  border-radius: 5px;
}
.query-row:not(:first-child){
  margin-top: 5px;
}
</style>
