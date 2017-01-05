<template>
<div class ="query_section">
    <div class="query_row">
        <span class="query_title">基础信息</span>
        <input id ="releaseStatus01" name ="statusArr" type="checkbox" value ="1" 
             v-model ="formData.statusArr" v-on:click="changeStateArray"/><label for="releaseStatus01">未发布</label>
        <input id ="releaseStatus02" name ="statusArr" type="checkbox" value ="2" 
             v-model ="formData.statusArr" v-on:click="changeStateArray"/><label for="releaseStatus02">已发布</label>
        <input  id ="effectStatus01" name="effStatusArr" type="checkbox" value ="1" 
            v-model ="formData.effStatusArr" v-on:click="changeStateArray" /><label for="effectStatus01"> 未生效</label>
        <input  id ="effectStatus02" name="effStatusArr" type="checkbox" value ="2" 
            v-model ="formData.effStatusArr" v-on:click="changeStateArray" /> <label for="effectStatus02">已生效</label>
        <input  id ="effectStatus03" name="effStatusArr" type="checkbox" value ="3" 
            v-model ="formData.effStatusArr" v-on:click="changeStateArray" /> <label for="effectStatus03">已过期</label>

        <label  class="marginR5 title">SUBCODE</label>
        <input type="text" name="subcode" class="common_input" v-bind:value ="formData.subcode" style="width:150px;" 
            placeholder="多个用/分割" v-on:input="changeStateSimple" />
        <label  class="marginR5 title">优先级序号</label>
        <input type="text" name ="startSequenceNumber" class="common_input" v-bind:value  ="formData.startSequenceNumber" style="width:80px;"
            v-on:input="changeStateSimple" />
        <span class="marginRL2">—</span>
        <input type="text" name ="endSequenceNumber" class="common_input" v-bind:value ="formData.endSequenceNumber" style="width:80px;" 
            v-on:input="changeStateSimple" />
            
        <span class="pull-right marginR15">
            <input  id ="moreInputBtn" type="checkbox" v-model="showMoreQuerySectionFlag" /> 
            <label for="moreInputBtn">更多条件</label>
            <button type="button" id="s7QueryBtn"
                    class="btn btn-sm btn-primary" v-on:click="handleClickQuery" >查询</button>
        </span>
    </div>
    <transition name="fade">
    <div  v-show ="showMoreQuerySectionFlag" >
        <div class="query_row">
            <span class="query_title">服务等级&nbsp;|&nbsp;日期</span>
            <input id ="serviceType01" value="F" name="serviceTypeArr"  v-model ="formData.serviceTypeArr" 
                type="checkbox" v-on:click="changeStateArray" /><label for="serviceType01">F-航班服务</label>
            <input id ="serviceType02" value="A" name="serviceTypeArr"  v-model ="formData.serviceTypeArr" 
                type="checkbox" v-on:click="changeStateArray" /><label for="serviceType02">A-免费行李</label>
            <input  id ="serviceType03" value="C" name="serviceTypeArr" v-model ="formData.serviceTypeArr" 
                type="checkbox" v-on:click="changeStateArray" /><label for="serviceType03">C-逾重行李</label>
            <input  id ="serviceType04" value="P" name="serviceTypeArr" v-model ="formData.serviceTypeArr" 
                type="checkbox" v-on:click="changeStateArray" /> <label for="serviceType04">P-预付费行李</label>
            <span class="marginR15"></span>
            <label class="marginR5 title">销售日期</label>

            <Datepicker v-bind:value ="formData.effectMinDate" name ="effectMinDate" 
                v-on:input="changeDateInput('effectMinDate',arguments[0])" />
            <label for="effectMinDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
            <span style="margin-right:4px;">—</span>
            <Datepicker v-bind:value ="formData.effectMaxDate" name ="effectMaxDate" 
                v-on:input="changeDateInput('effectMaxDate',arguments[0])" />
            <label for="effectMaxDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
            <span class="marginR15"></span>
            <label class="marginR5 title">旅行日期</label>
            <Datepicker v-bind:value ="formData.travelStartDate" name ="travelStartDate" 
                v-on:input="changeDateInput('travelStartDate',arguments[0])" />
            <label for="travelStartDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
            <span style="margin-right:4px;">—</span>
            <Datepicker v-bind:value ="formData.travelEndDate" name ="travelEndDate" 
                v-on:input="changeDateInput('travelEndDate',arguments[0])" />
            <label for="travelEndDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
        </div>

        <div class="query_row">
            <span class="query_title">常客等级|区域</span>
            <input id ="passengerTypeCode01" value="1" name="passengerTypeCodeArr"  v-model ="formData.passengerTypeCodeArr" 
                type="checkbox" v-on:click="changeStateArray" /><label for="passengerTypeCode01">白金卡</label>
            <input id ="passengerTypeCode02" value="2" name="passengerTypeCodeArr"  v-model ="formData.passengerTypeCodeArr" 
                type="checkbox" v-on:click="changeStateArray" /><label for="passengerTypeCode02">金卡</label>
            <input  id ="passengerTypeCode03" value="3" name="passengerTypeCodeArr" v-model ="formData.passengerTypeCodeArr" 
                type="checkbox" v-on:click="changeStateArray" /><label for="passengerTypeCode03">银卡</label>
            <input  id ="passengerTypeCode04" value="4" name="passengerTypeCodeArr" v-model ="formData.passengerTypeCodeArr" 
                type="checkbox" v-on:click="changeStateArray" /> <label for="passengerTypeCode04">普卡</label>
            <input  id ="passengerTypeCode05" value="5" name="passengerTypeCodeArr" v-model ="formData.passengerTypeCodeArr" 
                type="checkbox" v-on:click="changeStateArray" /><label for="passengerTypeCode05">非会员</label>
            <input  id ="passengerTypeCode06" value="6" name="passengerTypeCodeArr" v-model ="formData.passengerTypeCodeArr" 
                type="checkbox" v-on:click="changeStateArray" /> <label for="passengerTypeCode06">飞行卡</label>
            <label class="marginR5 title">区域</label>
            <input type="text" id="geoSpecLoc1" name ="geoSpecLoc1" v-bind:value ="formData.geoSpecLoc1" mode="upper" maxlength="3"  
                class="common_input" style="width: 100px" v-on:input="changeStateSimple" />
            <span class="marginLR5"> <i class="glyphicon glyphicon-sort ts90 myhand text-success" 
                title="切换区域" v-on:click="switchGeoLocValue"></i> </span>
            <input type="text" id="geoSpecLoc2" name ="geoSpecLoc2" v-bind:value ="formData.geoSpecLoc2" mode="upper" maxlength="3"  
                class="common_input" style="width: 100px" v-on:input="changeStateSimple" />
        </div>

        <div class="query_row">
            <span class="query_title">更新人|更新日期</span>
            <label class="title">最后更新人</label>
            <input  type="text" name ="updateUser" v-bind:value ="formData.updateUser" class="common_input" style="width:100px"
                v-on:input ="changeStateSimple" />
            <label class="marginR5 title">最后时间</label>
            <Datepicker v-bind:value ="formData.updateStartDate" name ="updateStartDate" 
                v-on:input="changeDateInput('updateStartDate',arguments[0])" />
            <label for="updateStartDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
            <span style="margin-right:4px;">—</span>
             <Datepicker v-bind:value ="formData.updateEndDate" name ="updateEndDate" 
                v-on:input="changeDateInput('updateEndDate',arguments[0])" />
            <label for="updateEndDate" class="glyphicon glyphicon-calendar iconfont_box"></label>
        </div>

    </div>
    </transition>
  </div>
</div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex' ;
    import Datepicker from './Datepicker.vue' ;
    import {defaultPageSize,defaultOrderTitleName} from '../common/index.js' ;
    export default {
        data:function(){
            return {
                showMoreQuerySectionFlag:false,
            };
        },
        methods:{
            handleClickQuery(){
                //只要是点击查询都是查询第一页
                //console.info('你点击了查询按钮',JSON.stringify(this.formData)) ;
                //进行查询操作
                let curPage = 1 ;
                let pageSize = this.pageBar.pageSize || defaultPageSize ;
                let orderName = defaultOrderTitleName ;//lastUpdateDate
                let isAsc = true ;
                let param1 = {curPage,pageSize,orderName,isAsc} ;
                this.clearTableTitleOrderInfo() ;
                this.queryList4Page({...param1,...this.formData}) ;
            },
            switchGeoLocValue(){
                //console.info('你点击了切换区域') ;
                // 触发组件 A 中的事件
                //bus.$emit('id-selected', 1)
                let geoSpecLoc1 = this.formData.geoSpecLoc2 ;
                let geoSpecLoc2 = this.formData.geoSpecLoc1 ;
                this.updateFormDataSimple({geoSpecLoc1,geoSpecLoc2}) ;
            },
            changeStateArray(event){
               let checkedFlag = event.target.checked ;
               let fieldName = event.target.name ;
               let fieldValue = event.target.value ;
               this.updateFormDataArray({fieldName,fieldValue,checkedFlag}) ;
            },
            changeStateSimple(event){
                let fieldName = event.target.name ;
                let fieldValue = event.target.value  ;
                if('subcode'==fieldName){
                    fieldValue = fieldValue.toUpperCase() ;
                }
                this.updateFormDataSimple({[fieldName]:fieldValue}) ;
            },
            changeDateInput(fieldName,fieldValue){
                //console.info('fieldName : ' , fieldName) ;
                //console.info('fieldValue : ' , fieldValue) ;
                this.updateFormDataSimple({[fieldName]:fieldValue}) ;
            },
            ...mapActions([
                'queryList4Page',
                'clearTableTitleOrderInfo',
                'updateFormDataArray',
                'updateFormDataSimple'
            ])
        },
         computed: mapGetters([
            'pageBar',
            'formData'
        ]),
        components:{
            Datepicker
        }
    }
</script>
<style>
    .fade-enter-active {
       transition: height .3s ease ;
       height: 90px;
    }

    .fade-leave-active {
        height: 0;
    }
    
</style>