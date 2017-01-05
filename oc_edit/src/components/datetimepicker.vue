<template>
    <span class="oc-datetimepicker-container">
        <input type ="text"   
            class ="form-control input-sm"
            :id ="randomId"
            :value="currentValue" 
            @input ="onInput" 
            @blur ="onBlur" 
            :disabled="disabled"
        />
        <!--oc-datepicker-icon-->
        <label  class="  oc-input__icon" :class ="{'el-icon-time':pickerType==='time','el-icon-date':pickerType!=='time'}"></label>
    </span>
</template>
<script>
    import emitter from './mixin/emitter';
    import util from 'util_lib' ;

    export default {
         name:'oc-datetimepicker',
         //props:['value'],
         mixins: [emitter],
         props:{
             value:{
                 type:String,
                 default:''
             },
             disabled:Boolean,
             pickerType:{
                 type:String,
                 default:'date'
             },
             splitChar:{
                 type:String,
                 default:'-'
             },
             minDate:Date
         },
         data:function(){
            return {
                randomId:('input-' + Math.random()).replace('\.','-') ,
                currentValue:this.value,
                inputedFlag:false
            } ;
         },
         methods:{
            onInput(event){
                var val = event.target.value ;
                this.currentValue = val ;
                this.inputedFlag = true ;
                //this.$emit('input',val) ;
                //this.$emit('change', val);
                //this.dispatch('form-item', 'el.form.change', val);
            },
            onBlur(event){//主要针对输入的值进行处理
                if(this.inputedFlag){
                    let val = event.target.value.trim() ;
                    let flag = checkInputValid(val,this.pickerType,this.splitChar) ;//inputStr,withTimeFlag,splitChar
                    if(flag){
                        this.$emit('input',val) ;
                        this.dispatch('form-item', 'el.form.blur', [val]);
                        //this.dispatch('form-item', 'el.form.change', [val]);
                        return ;
                    }
                }
                //没有输入过，或则输入的错误，则值需要被回退
                this.dispatch('form-item', 'el.form.blur', [this.value]);
                $(event.target).val(this.currentValue) ;
            }
         },
         mounted:function(el){
            var pickerType = this.pickerType ;
            var arr = ['date','time','datetime']  ;
            switch(pickerType){
                case 'date':
                    initDate(this) ;
                    break;
                case 'time':
                    initTime(this) ;
                    break;
                case 'datetime':
                    initDatetime(this) ;
                    break;
                default:
                    initDate(this) ;
            }
         },
         watch:{
             value(newVal,oldVal){
                 this.currentValue = newVal ;
             }
         }
    }

    function initDate(_self){
        var minDate = _self.minDate ;
        var dataFormat = "yy"+_self.splitChar+"mm"+_self.splitChar+"dd" ;
        var timeFormat = "HH:mm" ;
        var optionObj = {"showButtonPanel":true,"dateFormat":_self.dataFormat} ;
        optionObj.onSelect = function(dateText,picker){
            _self.$emit('input',dateText) ;
            //_self.$emit('change', dateText);
            //_self.dispatch('form-item', 'el.form.blur', dateText);
            _self.dispatch('form-item', 'el.form.change', dateText);
        }
        if(minDate!=null){
            //optionObj.minDate = new Date(minDateStr) ;
            optionObj.minDate = minDate;
        }
        $('#'+_self.randomId).datepicker(optionObj) ;
    }
    function initTime(_self){
        var optionObj = {
            controlType:'select',
            timeFormat: 'HHmm',
            timeOnly:  true,
            timeOnlyTitle: '选择时间',//Choose Time
            timeText: '时间',//Time
            hourText: '小时',//Hou
            minuteText: '分钟',//Minute
            currentText: '当前',//Current
            closeText: '关闭'//Close
        };
        optionObj.onSelect = function(dateText,picker){
            //console.info('dateText : ' + dateText) ;
            _self.$emit('input',dateText) ;
            //_self.$emit('change', dateText);
            //_self.dispatch('form-item', 'el.form.blur', dateText);
            _self.dispatch('form-item', 'el.form.change', [dateText]);
        }
        $('#'+_self.randomId).datetimepicker(optionObj);
    }
    function initDatetime(_self){
        var minDate = _self.minDate ;
        var dataFormat = "yy"+_self.splitChar+"mm"+_self.splitChar+"dd" ;
        var timeFormat = "HH:mm" ;
        var optionObj = {"showButtonPanel":true,"dateFormat":_self.dataFormat} ;
        optionObj.onSelect = function(dateText,picker){
            _self.$emit('input',dateText) ;
            //_self.$emit('change', dateText);
            //_self.dispatch('form-item', 'el.form.blur', dateText);
            _self.dispatch('form-item', 'el.form.change', [dateText]);
        }
        if(minDate!=null){
           // optionObj.minDate = new Date(minDateStr) ;
            optionObj.minDate = minDate;
        }
        optionObj.timeFormat = timeFormat ;
        optionObj.timeText="&nbsp;&nbsp;时间" ; 
        optionObj.hourText ="&nbsp;&nbsp;时" ;
        optionObj.minuteText ="&nbsp;&nbsp;分" ;  
        //optionObj.secondText = "&nbsp;&nbsp;秒" ;
        optionObj.currentText = "当前" ;
        optionObj.closeText = "关闭" ;
        $('#'+_self.randomId).datetimepicker(optionObj) ;
    }
    /**
     *检查输入字符串是否合法
     *  */
    function checkInputValid(inputStr,pickerType,splitChar){
        let retFlag = true;
        if(inputStr===''){
            return retFlag ;
        }
        switch(pickerType){
            case 'date':
                retFlag = checkDate(inputStr,splitChar) ;
                break;
            case 'time':
                retFlag = checkTime(inputStr) ;
                break;
            case 'datetime':
                retFlag = checkDatetime(inputStr,splitChar) ;
                break;
            default:
                retFlag = checkDate(inputStr) ;
        }
        return retFlag ;
    }
  

    function checkDate(inputStr,splitChar){
        let dataStr = inputStr || '' ;
        let noTimeLimit = true ;
        let flag =  util.checkDataValid(dataStr,splitChar,noTimeLimit) ;
        return flag ;
    }
    /**
     * 因为页面上的时间控件的格式为HHmm中间没有分割符，而时间日期控件的格式为 HH:mm中间有分隔符
     * 这一需要注意
     * */
    function checkTime(inputStr,formatChar){
       if(formatChar&&formatChar===':'){
            let timeStr = inputStr || '' ;
            let flag = util.isTimeOC(timeStr) ;
            return flag ;
       }
       return true ;
    }
    function checkDatetime(inputStr,splitChar){
        let datetimeStr = inputStr || '' ;
        let infos = datetimeStr.split(' ') ;//日期与时间之前以空格分隔
        if(infos.length!==2) return false;
        if(checkDate(infos[0],splitChar)&&checkTime(infos[1],":")){
            return true ;
        }
        return false;
    }

</script>
<style>
    .oc-datetimepicker-container{
        display: block;
        position: relative ;
    }
    .oc-datetimepicker-icon{
        display: inline-block;
        position: absolute ;
        right: 10px;
        top: 9px;
    }
</style>