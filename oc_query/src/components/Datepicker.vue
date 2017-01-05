<template>
    <input v-bind:id ="randomId" v-bind:value="value" v-on:input ="onInput"  
        type ="text" class ="common_input datepicker" style="width: 110px"/>
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
            var options = {"showButtonPanel":true,"dateFormat":"yy-mm-dd"} ;
            options.onSelect = function(dateText,picker){
                var v = moment(dateText).format("YYYY-MM-DD") ;
                _self.$emit('input',v) ;
            }
            $('#'+this.randomId).datepicker(options) ;
         }
    }
    
</script>
<style>

</style>