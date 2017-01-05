<template>
  <div class ="query_section" >
    	<div class ="query_row">
	    	<span class="query_title">{{title}}</span>
	        <span>服务类型&nbsp;|</span>
	        <span>费用&nbsp;|</span>
	        <span>规则</span>
	        <span class="pull-right marginR15">
	        	<button type="button" id="back" @click ="backPage" class="btn btn-default btn-sm">返回</button>
                <button type="button" id="back" @click ="clickResetFormBtn" class="btn btn-danger btn-sm">重置</button>
	            <button type="button" id="s7_save" @click ="submitForm('save')" class="btn btn-default btn-sm">保存</button>
	            <button type="button" id="s7_saveAndPublish" @click="submitForm('saveAndPublish')"  class="btn btn-default btn-sm btn-success">保存并发布</button>
	        </span>
    	</div>
    </div>  
</template>
<script>
    import util  from 'util_lib' ;
    export default {
        props:{
            title:{
                type:String,
                default:'新建服务费用'
            },
            handleSaveForm:Function,
            handleResetForm:Function
        },
        methods:{
            backPage(){
                let url = "/oc/toQueryS7UI.action" ;
                util.goToPageByUrl(url) ;
            },
            submitForm(type){
                //console.info('type : ' + type) ;
                //this.$emit('clickSaveFormBtn',type) ;
                this.handleSaveForm(type) ;
            },
            clickResetFormBtn(){
                //this.$emit('clickResetFormBtn') ;
                this.handleResetForm() ;
            }
        }
    }
</script>