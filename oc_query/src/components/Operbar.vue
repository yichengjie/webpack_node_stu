<template>
    <div>
        <div class="pull-right clearfix" style="margin-bottom: 8px">
            <button class="btn btn-success btn-sm" v-on:click="toAddUI">新建</button>
            <button class="btn btn-default btn-sm" v-on:click ="doDeleteOper">删除</button>
            <button class="btn btn-default btn-sm" v-on:click ="doPublishOper">发布</button>
            <button class="btn btn-default btn-sm" v-on:click ="showAbortUI">截止</button>
            <div class ="dropdown-oc">
                <div class="btn-group">
                    <button class="btn btn-default btn-sm" id="batchImportBtn" 
                        for="batchImportFileInput" v-on:click="showBatchImportUI">批量导入</button>
                    <button class="btn btn-default btn-sm dropdown-trigger"><i class="glyphicon glyphicon-triangle-bottom"></i></button>
                </div>
                <ul class ="dropdown-menu-oc">
                    <li v-on:click ="downExcelTemplat">下载模板</li>
                </ul>
            </div>
        </div>
        <span class="clearfix"></span>
        <BatchAbort/>
        <BatchImport />
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex' ;
    import BatchAbort from './BatchAbort.vue' ;
    import BatchImport from './BatchImport.vue' ;
    import {toastInfo,toastDanger,toastSuccess,getJspPageParam} from '../common/index.js' ;
    import api from '../api/index.js' ;
    let _ = require('lodash_lib') ;
    let moment = require('moment_lib') ;

    export default {
        name:'operbar',
        methods:{
            downExcelTemplat(){
                //onclick="location.href='${pageContext.request.contextPath}/ocimport/download.action'"
                let {contextPath} = getJspPageParam() ;
                window.location.href = contextPath +"/ocimport/download.action" ;
            },
            toAddUI(){
                //console.info('准备跳转到新增页面上去!') ;
                //location.href='${pageContext.request.contextPath}/oc/toAddS7UI.action'
                let {contextPath} = getJspPageParam() ;
                window.location.href = contextPath +"/oc/toAddS7UI.action" ;
            },
            doDeleteOper(){
                let flag = this.checkedIdArr.length > 0 ;
                if(flag){
                     let records7List = this.records7List ;
                     let idArr = this.checkedIdArr ;
                     let flag2 = new S7DeleteClass().doValidate(idArr,records7List) ;
                     if(flag2){
                        $.showTuiConfirmDialog('确认删除?', () => {
							api.batchDeleteApi(idArr).then(retData =>{
	                            if(retData.flag){
	                                //删除vuex中的数据
	                                this.batchDeleteRecords7() ;
	                            }
	                        }) ;
						}) ;
                     }else{
                        toastDanger('包含【已发布】的记录，不能删除!') ;
                     }
                }else{
                    toastDanger('请选择需要【删除】的记录!') ;
                }
            },
            doPublishOper(){
                if(this.checkedIdArr.length > 0){
                    let s7Publish = new S7PublishClass() ;
                    let idArr = this.checkedIdArr ;
                    let records7List = this.records7List ;
                    let {flag,retArr} = s7Publish.doValidate(idArr,records7List) ;
                    if(flag){
                        api.batchPublishApi(retArr).then(function(retData){
                            if(retData.flag){
                                //点击查询按钮触发一次查
                                $("#s7QueryBtn").trigger('click') ;
                            }
                        }) ;
                    }
                }else{
                    toastDanger('请选择需要【发布】的记录!') ;
                }
            },
            showAbortUI(){
               // console.info('显示截止模态框...') ;
                let flag = this.checkedIdArr.length > 0 ;
                if(flag){
                    $("#abortModal").modal('show') ;
                }else{
                    toastDanger('请选择需要【截止】的记录!') ;
                }
            },
            showBatchImportUI(event){
                var forId =  $(event.target).attr("for") ;
                $("#"+forId).trigger('click') ;
                //$("#batchImportModal").modal('show') ;
            },
            ...mapActions([
                'batchDeleteRecords7'
            ])
        },
        computed:mapGetters([
            'checkedIdArr',
            'records7List'
        ]),
        mounted(){
           initPagePlugin() ;
        },
        components:{
            BatchAbort,
            BatchImport
        }
    }

    class S7DeleteClass{
        doValidate(idArr,records7List){
            let canDeleteFlag = true ;
            for(let id of idArr){
                for(let o of records7List){
                    if(o.id === id && o.statusDes!=='1'){
                        canDeleteFlag = false;
                        break ;
                    }
                }
                if(!canDeleteFlag){ break ;}
            }
            return canDeleteFlag ;
        }
    }



    class S7PublishClass{
        _checkItemIsValid(item,sysDate){//检查准备发布的记录是否合法
            var effDateText = item.saleStartDateShow; //saleStartDateShow
            var discDateText = item.saleEndDateShow ;
            var effDate = moment(effDateText, 'YYYY/MM/DD');
            var discDate = moment(discDateText,'YYYY/MM/DD');
            if (effDate >= sysDate && discDate >= effDate) {
                return true ;
            } else {
                return false;
            }
        }
        doValidate(idArr,records7List){
            let retArr = [] ;
            let allValidate = true ;
            var sysDateStr = moment().format('YYYY/MM/DD') ;
            var sysDate = moment(sysDateStr,'YYYY/MM/DD') ;
            for(let id of idArr){
                if(!allValidate){break ;} 
                //当allValidate为true时
                let temObj = _.find(records7List, {'id': id, 'status': '1' });
                if(temObj){
                    if(this._checkItemIsValid(temObj,sysDate)){
                    retArr.push(id);
                    }else{
                        toastDanger('存在【未发布-已过期】的记录，不能发布！') ;
                        allValidate = false;
                    }
                }
            }
            if(retArr.length==0){//如果不存在一个条可发布的记录，则不做任何反应
                allValidate = false;
            }
            return {"flag":allValidate,"retArr":retArr} ;
        }
    }

    function initPagePlugin(){
        $(".dropdown-oc").find(".dropdown-trigger").click(function (e) {
            e.stopPropagation() ;
            $(".dropdown-menu-oc").removeClass('open') ;
            $(this).parents(".dropdown-oc").find(".dropdown-menu-oc").toggleClass('open') ;
        }) ;

        $(document).click(function(e){
            e.stopPropagation() ;
            $('.dropdown-menu-oc').removeClass('open') ;
        }) ; 
    }
    
</script>
<style>
    
</style>
