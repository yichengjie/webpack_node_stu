<template>
    <span>
         <input type="text" v-bind:id ="randomId" v-bind:value="value" v-on:input ="onInput"  
            class="common_input" name="lastMaintenanceDate" style ="width:96%"/>
        <label v-bind:for="randomId" class="glyphicon glyphicon-calendar iconfont_box"></label>      
    </span>
       
</template>
<script>
    import moment from 'moment_lib' ;
    export default {
         props:['value'],
         data:function(){
            return {
                randomId:('input-' + Math.random()).replace('\.','-') 
            } ;
         },
         methods:{
            onInput:function(event){
                this.$emit('input',event.target.value) ;
            }
         },
         mounted:function(el){
            var _self = this ;
            var optionObj = {} ;
            optionObj.dateFormat = "yy-mm-dd" ;
            optionObj.timeFormat = 'HH:mm' ;
            optionObj.onSelect = function(dateText,picker){
               _self.$emit('input',dateText) ;
            };
            var minDate = new Date() ;
            optionObj.timeText="&nbsp;&nbsp;时间" ; 
            optionObj.hourText ="&nbsp;&nbsp;时" ;
            optionObj.minuteText ="&nbsp;&nbsp;分" ;  
            optionObj.secondText = "&nbsp;&nbsp;秒" ;
            optionObj.currentText = "当前" ;
            optionObj.closeText = "关闭" ;
            optionObj.minDate = minDate ;
            optionObj.showButtonPanel = true ;
            $('#'+this.randomId).datetimepicker(optionObj) ;
         }
    }
</script>
<style>

</style>