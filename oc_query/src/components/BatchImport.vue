<template>
    <div class="modal fade" id ="batchImportModal">
         <form method="post"  enctype="multipart/form-data" id ="batchImportForm">
            <input type="file" name ="file" id ="batchImportFileInput" style="display: none" 
                v-bind:value ="fileName" v-on:change ="showBatchImportUI2"/>
        </form>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" 
                        aria-label="Close" v-on:click ="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">批量导入操作</h4>
                </div>
                <div class="modal-body">
                    <div class ="row">
                        <div class ="col-sm-10 col-sm-offset-1">
                            <p>文件&nbsp;:&nbsp;<span id ="batchImportFileName">{{fileName}}</span></p>
                        </div>
                    </div>
                    <br/>
                    <div class ="row">
                        <div class ="col-sm-10 col-sm-offset-1">
                            <ul id ="batchImportTipInfo">
                                <li v-for="item in tipMsgArr">
                                    <span v-bind:class="{'text-success': tipSuccessFlag,'text-danger': !tipSuccessFlag }">
                                        {{item}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" v-on:click ="closeModal" class="btn btn-default"
                         data-dismiss="modal">关闭</button>
                    <button type="button" v-show ="canOperFlag" v-on:click ="confirmImport" 
                        class="btn btn-primary" id ="submitBatchImportFormBtn">导入</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../api/index.js' ; 
    export default {
       methods:{
           showBatchImportUI2(event){
              // console.info('value : ' + event.target.value) ;
              let newFileName = event.target.value ;
              this.fileName = newFileName ;
              if(newFileName&&newFileName.length>0){
                 $("#batchImportModal").modal('show') ;
              }
           },
           closeModal(){
               this.fileName = '' ; 
               this.clearTipInfo() ;
           },
           confirmImport(){
               //console.info('导入的文件名称为 : ' + this.fileName) ;
               //不能再次点击确定按钮
               this.canOperFlag = false ;
               //下面是处理导入的业务逻辑
               this.clearTipInfo() ;
               this.tipSuccessFlag = true ;
               this.tipMsgArr.push('数据正在导入中，请耐心等待……') ;
               api.batchImportApi().then((retData) =>{
                   this.clearTipInfo() ;
                   let {flag,msg} = retData ;
                   this.tipSuccessFlag = flag ;
                   this.tipMsgArr = msg;
                   this.canOperFlag = true;
                   if(flag){
                       setTimeout(() => {
                           $("#batchImportModal").modal('hide') ;
                            this.fileName = '' ; 
                           this.clearTipInfo() ;
                       },1000) ;
                   }
               },(err) =>{
                   this.clearTipInfo() ;
                   this.tipSuccessFlag = false ;
                   this.canOperFlag = true;
                   this.tipMsgArr.push('网络请求出错!');
               }) ;
           },
           clearTipInfo(){
               this.tipMsgArr.splice(0,this.tipMsgArr.length) ;
           }
       },
       data(){
           return {
              fileName:'',
              tipSuccessFlag:false,
              tipMsgArr:[],
              canOperFlag:true
           }
       }
    }

    class s7BatchImport{

        cleanTipInfo (){
            modalHelper.cleanTipInfo() ;
        } 
        addErrorTip(errMsg){
            modalHelper.addErrorTip(errMsg) ;
        } 
        addSuccessTip(sucMsg){
            cleanTipInfo() ;
            modalHelper.addSuccessTip(sucMsg) ;
        } 
    }
</script>
<style>

</style>