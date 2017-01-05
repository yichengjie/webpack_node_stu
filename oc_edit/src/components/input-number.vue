<template>
      <input
        class="form-control input-sm"
        type="text"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :value="currentValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
</template>
<script>
  import emitter from './mixin/emitter';
  //import calcTextareaHeight from './calcTextareaHeight';
  export default {
    name: 'oc-input-number',
    mixins: [emitter],
    props: {
      value: [String, Number],
      placeholder: String,
      name: String,
      maxlength: [String,Number],
      disabled:Boolean,
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: 0
      },
      intFlag:{
        type:Boolean,
        default:true
      }
    },
    data(){
        // let value = this.value;
        // if (value < this.min) {
        //     this.$emit('input', this.min);
        //     value = this.min;
        // }
        // if (value > this.max) {
        //     this.$emit('input', this.max);
        //     value = this.max;
        // }
        return {
            currentValue:this.value
        };
    },
    methods: {
      handleBlur(event) {
         let valNum = Number(this.currentValue);
         //如果页面上填写的数据有问题，进行回退到上一次的数据,否则不管
         let flag = checkMinMax(valNum,this.min,this.max) ;
         if(!flag){//如果输入数组不在最大最小范围内
            this.currentValue = this.value;
         }
         flag = checkInteger(valNum,this.intFlag) ;
         if(!flag){
            this.currentValue = this.value;
         }
         this.$emit('blur', this.value);
         this.dispatch('form-item', 'el.form.blur', [this.value]);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleInput(event) {
         var val = event.target.value;
         this.currentValue = val ;
         if(val!==''){
            let valNum = Number(val);
           let flag = checkMinMax(valNum,this.min,this.max) ;
           if(!flag){
             return false;
           }
           flag = checkInteger(valNum,this.intFlag) ;
           if(flag){
              this.$emit('input', val);
              this.dispatch('form-item', 'el.form.change', [val]);
           }
         }else{
            this.$emit('input', val);
            this.dispatch('form-item', 'el.form.change', [val]);
         }
      }
    },
    watch: {
      value(newVal,oldVal) {
        //console.info('newVal : ' + newVal) ;
        this.currentValue = newVal;
      }
    },
  };

  function checkMinMax(val,min,max){
     if (val <= max && val >= min) {
       return true ;
     }
     return false;
  }

  function checkInteger(val,intFlag){//是否为正整数
     if(intFlag){
        var re = /^-?[0-9]\d*$/ ;
        return re.test(val)
     }
     return true ;
  }  
</script>
