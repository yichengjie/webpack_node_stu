<template>
<div class="clearfix" >
    <nav class ="pull-right" v-show ="pageBar.isQueryDB">
        <ul class="pagination" style="margin:0;">
            <li>  <a href="javascript:void(0)" v-on:click ="toPage(1)">首页</a></li>
            <li>
                <a href="javascript:void(0)" aria-label="Previous" v-on:click ="toPerviousPage">上一页</a>
            </li>
            <li v-for="l in pageBar.pgArr"    v-bind:class="{ 'active': pageBar.curPage==l}" >
                <a href="javascript:void(0)"  v-on:click="toPage(l)">{{l}}</a>
            </li>
            <li v-if ="pageBar.pageCount>5&&(pageBar.curPage+3) <=pageBar.pageCount"><span>...</span></li>
            <li>
                <a href="javascript:void(0)" aria-label="Next" v-on:click ="toNextPage">下一页</a>
            </li>
            <li> <a href="javascript:void(0)" v-on:click ="toPage(pageBar.pageCount)">末页</a></li>
        </ul>
        <div class="page-desc" style="padding-top: 0px;padding-bottom:0px">
            <span class="marginRight10">共<span class ="marginRL2">{{pageBar.pageCount}}</span>页</span>
            <span class ="">当前第</span>
            <input type="text" v-bind:value ="pageBar.curPage" ref= "pageBarInputCurrentPage"
                class ="common_input"  style="width: 30px"   >
            <span class="marginRight5 ">页</span>
            <span>显示
                <select class="pagesize" v-bind:value ="pageBar.pageSize" v-on:change ="changePageSize">
                    <option value="10">10条</option>
                    <option value="15">15条</option>
                    <option value="20">20条</option>
                    <option value="25">25条</option>
                    <option value="30">30条</option>
                    <option value="50">50条</option>
                    <option value="100">100条</option>
                </select>
            </span>
            <span class="page-ok" v-on:click ="pageConfirm">确定</span>
        </div>
    </nav>
</div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex' ;
    export default{
        data (){
            return {
                randomId:'input-' + Math.random()
            };
        },
        methods:{
            pageConfirm(){
                let value = this.$refs.pageBarInputCurrentPage.value ;
                if(!isNaN(value)){//如果是数字
                    let pageOkInputNum = value *1 ;
                    if(pageOkInputNum>0&&pageOkInputNum<=this.pageBar.pageCount*1){
                        this.queryDB(pageOkInputNum) ;
                        this.updatePageBar({curPage:pageOkInputNum}) ;
                    }else{
                       this.$refs.pageBarInputCurrentPage.value =  this.pageBar.curPage ;
                    }
                }else{
                    this.$refs.pageBarInputCurrentPage.value =  this.pageBar.curPage ;
                }
            },

            changePageSize(event){
                this.updatePageBar({pageSize:event.target.value}) ;
            },
            toPage(pnum){
                if(pnum!=this.pageBar.curPage){
                    let toPageNum = pnum ;
                    this.queryDB(toPageNum) ;
                }
            },
            toPerviousPage(){
                if(this.pageBar.curPage*1>1){//触发查询操作
                    let toPageNum = this.pageBar.curPage*1 -1 ;
                    this.queryDB(toPageNum) ;
                }
            },
            toNextPage(){
                if(this.pageBar.curPage*1<this.pageBar.pageCount*1){//触发查询操作
                    let toPageNum = this.pageBar.curPage*1 +1;
                    this.queryDB(toPageNum) ;
                }
            },
            queryDB (toPageNum){
                if(!this.queryDBFlag){//没有勾选查询全部时，清除排序状态
                    this.clearTableTitleOrderInfo() ;
                }
                let curPage =  toPageNum ;
                let pageSize = this.pageBar.pageSize ;
                let orderName =  this.orderTitleName ;
                let isAsc = this.tableTitleOrder[this.orderTitleName] ;
                let param1 = {curPage,pageSize,orderName,isAsc } ;
                //查询数据库
                this.queryList4Page({...param1,...this.formData}) ;
            },
            ...mapActions([
                'updatePageBar',
                'queryList4Page',
                'clearTableTitleOrderInfo'
            ])
        },
        computed: mapGetters([
            'listCount',
            'pageBar',
            'orderTitleName',
            'tableTitleOrder',
            'queryDBFlag',
            'formData'
        ])
    }
</script>
<style>
</style>
