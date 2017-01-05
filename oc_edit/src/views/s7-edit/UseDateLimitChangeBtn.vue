<template>
     <div class ="table_control">
        <span class ="discountBtn" :class ="{'discountCheck':value=='','is-disabled':subGroup==='FL'}" @click ="handleChangeUseDateLimitTye('')" >时间段</span>
        <span class ="discountBtn" :class ="{'discountCheck':value=='1'}" @click ="handleChangeUseDateLimitTye('1')">期限</span>
    </div>
</template>
<script>
    export default {
      props:{
        value:{
            type:String,
            default:''
        },
        formData:Object,
        subGroup:String
      } ,
      methods:{
          handleChangeUseDateLimitTye(val){
              if(this.subGroup !== 'FL'){
                  this.$emit('input',val) ;
              }
          }
      },
      watch:{
          subGroup(newVal,oldVal){
              if(newVal==='FL'){
                  this.$emit('input','1') ;
              }
          },
          value(newVal,oldVal){
              if(newVal===''){
                  this.formData.effectivePeriodType = '' ;
                  this.formData.effectivePeriodNumber = '' ;
                  this.formData.effectivePeriodUnit = '' ;
              }else if(newVal==='1'){
                  this.formData.firstUseDate = '' ;
                  this.formData.lastUseDate = '' ;
              }
          }
      } 
    } ;
</script>
<style>

</style>