<template>
    <div class="modal fade" id ="abortModal" data-backdrop="static">
        <div class="modal-dialog" style = "width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" v-on:click ="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">批量截止操作</h4>
                </div>
                <div class="modal-body">
                    <div class ="row">
                        <label class="col-sm-3"><span class="marginRight15"></span>截止日期</label>
                        <div class="col-sm-6">
                            <DateTimepicker v-model ="abortDateTimeInput" />      
                        </div>
                    </div>
                    <br />
                    <div>
                        <ul id ="abortTipInfo">
                            <li v-for="item in tipMsgArr">
                                <span v-bind:class="{'text-success': tipSuccessFlag,'text-danger': !tipSuccessFlag }">
                                    {{item}}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" v-on:click ="closeModal" data-dismiss="modal">关闭</button>
                    <button type="button" v-show ="canOperFlag" class="btn btn-primary" id ="abortModalConfirm" v-on:click ="handleAbortConfirm"
                            url ="${pageContext.request.contextPath}/s7/batchObortR7.action">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DateTimepicker from './DateTimepicker.vue' ;
    import api from '../api/index.js' ;
    let util = require('util_lib') ;
    let _ = require('lodash_lib') ;
    import {convertDateTimeStr2Date} from '../common/index.js' ;
    import { mapGetters, mapActions } from 'vuex' ;
    
    export default {
        data(){
            return {
                abortDateTimeInput:"",
                tipSuccessFlag:false,
                tipMsgArr:[],
                canOperFlag:true
            } ;
        },
        methods:{
            handleAbortConfirm(){
                //console.info('确定截止...' +this.abortDateTimeInput) ;
                let idArr = this.checkedIdArr ;
                let records7List = this.records7List ;
                let flag = this.doValidate(idArr,records7List) ;
                let lastMaintenanceDate = this.abortDateTimeInput ;
                if(flag){
                     this.doDBOper(idArr,lastMaintenanceDate) ;
                }
            },
            doDBOper(idArr,lastMaintenanceDate){//与数据库交互
                this.canOperFlag = false;
                //处理截止的业务逻辑
                this.clearTipInfo() ;
                this.tipSuccessFlag = true ;
                this.canOperFlag = false;
                this.tipMsgArr.push('操作中请稍后...') ;
                api.batchAbortApi(idArr,lastMaintenanceDate).then(({flag,msg}) => {
                    this.canOperFlag = true;
                    this.clearTipInfo() ;
                    this.tipSuccessFlag = flag ;
                    this.tipMsgArr = msg ;
                    if(flag){
                        //更新vuex中的数据
                        this.batchAbortRecords7(lastMaintenanceDate) ;
                        setTimeout(() =>{
                            this.abortDateTimeInput = "" ;
                            $("#abortModal").modal('hide') ;
                            this.clearTipInfo() ;
                        },1000) ;
                    }
                },err => {
                    this.clearTipInfo() ;
                    this.tipSuccessFlag = false;
                    this.canOperFlag = true;
                    this.tipMsgArr.push('网络请求出错!') ;
                }) ;
            },
            doValidate(idArr,records7List){
                if(this.abortDateTimeInput.trim() === ''){
                    this.tipSuccessFlag = false;
                    this.tipMsgArr.push('截止日期必填!') ;
                    return false;
                }
                //如果填写了日期
                var tttFlag1 = util.isDateTimeOC(this.abortDateTimeInput) ;
                if(!tttFlag1){
                    this.tipSuccessFlag = false;
                    this.tipMsgArr.push('日期格式不合法!') ;
                    return false;
                }
                //如果日期输入合法
                var inputDate = convertDateTimeStr2Date(this.abortDateTimeInput) ;
			    var isBiggerThanCurrent = util.isBiggerDateTimeThanCurrentNextHour(this.abortDateTimeInput) ;
                if(!isBiggerThanCurrent){
                    this.tipSuccessFlag = false;
                    this.tipMsgArr.push('截止日期必须大于当前时间下一小时0分!') ;
                    return false;
			    }
                //如果日期还是合法的
                var allBiggerFlag = true ;
				var checkedStartDateArr = [] ;
				for(let id of idArr){
                    let temObj = _.find(records7List,{"id":id}) ;
                    if(temObj){
                        var curStartDate = convertDateTimeStr2Date(temObj.saleStartDate) ;
                        if(inputDate<curStartDate){
                            allBiggerFlag = false;
                            break ;
                        }
                    }
				}
				//如果大于所有记录的起始日期
				if(!allBiggerFlag){
                    this.tipSuccessFlag = false;
                    this.tipMsgArr.push('截止日期目前的校验是需要 ≥ 销售生效日期!') ;
                    return false;
				}
                return true ;
            },
            closeModal(){
                this.abortDateTimeInput = "" ;
                this.clearTipInfo() ;
            },
            clearTipInfo(){
               this.tipMsgArr.splice(0,this.tipMsgArr.length) ;
            },
            ...mapActions([
                'batchAbortRecords7'
            ])
        },
        computed: mapGetters([
            'records7List',
            'checkedIdArr',
        ]),
        components:{
            DateTimepicker
        }
    }


 
</script>
<style scoped>
  
</style>