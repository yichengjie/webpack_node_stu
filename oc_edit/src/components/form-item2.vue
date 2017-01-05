<template>
  <div class="form-group" :class ="{'has-error':error !== '','form-group-bottom-error':errorPosition==='bottom'}" v-show ="visiable">
    <label class="control-label" :title="label" :class ="{'required':required}" v-bind:style="labelStyle" v-if ="label"> 
      {{label}}
    </label>
    <slot></slot>
    <div class="error-container" :class ="{'tooltip-error':tooltip}" :data-title ="error" v-show="error !== ''">
      <span class="error-info">{{error}}</span>
    </div>
    <slot name ="slot2"></slot>
  </div>
</template>

<script>
  import AsyncValidator from 'async-validator';
  import emitter from './mixin/emitter';
  import mixin2 from './mixin/form-item.js' ;

  export default {
    name: 'oc-form-item2',
    componentName: 'form-item',
    mixins: [emitter,mixin2],
    props: {
      label: String,
      labelWidth: String,
      prop: String,
      required: {
          type:Boolean,
          default:false
      },
      names:Array,
      rules: [Object, Array],
      errorPosition:{
        type:String,
        default:''
      },
      tooltip:{
        type:Boolean,
        default:false
      }
    },
    computed: {
      labelStyle() {
        var ret = {};
        var labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          ret.width = labelWidth;
        }
        return ret;
      },
      form() {
        var parent = this.$parent;
        while (parent.$options.componentName !== 'form') {
          parent = parent.$parent;
        }
        return parent;
      },
      fieldNameArr(){//获取字段名称数组
          // var formRules = this.form.rules;//[this.prop]
          // var fieldRules = formRules ? formRules[this.prop] : undefined ;
          // if(fieldRules && fieldRules['names']){
          //   return fieldRules['names'] ;
          // }else{
          //   return [] ;
          // }
          return this.names || [] ;
      },
      fieldValueArr: {
        cache: false,
        get() {
          var model = this.form.model;
          if (!model || !this.prop) { return; }
          var names = this.fieldNameArr ;
          var values = [] ;
          for(let name of names){
            values.push(model[name]) ;
          }
          return values ; 
        }
      }
    },
    data() {
      return {
        valid: true,
        error: '',
        validateDisabled: false,
        validating: false,
        validator: {},
        initialValueArr: null,
        visiable:true/*是否可见，如果控件不可见，对应的字段value将会被清空**/
      };
    },
    methods: {
      validate(trigger, cb) {
        //console.info('--------validate : ' + trigger) ;
        //如果控件不可见，则不做表单校验
        if(!this.visiable){
           cb && cb();
           return true;
        }
        //进行验证先关的操作
        //console.info('validate .......') ;
        var rules = this.getFilteredRule(trigger);
        //console.info('rules : ' ,rules) ;
        if (rules==null) {
          cb && cb();
          return true;
        }
        this.validating = true;
        var descriptor = rules;
        //console.info('descriptor , ' , JSON.stringify(descriptor) ) ;
        var validator = new AsyncValidator(descriptor);
        var names = this.fieldNameArr ;
        var values = this.fieldValueArr ;
        var model = {};
        for(let i = 0 ; i < names.length ;i ++){
          model[names[i]] = values[i] +"";
        }
        //console.info('model : ' ,JSON.stringify(model)) ;
        validator.validate(model, { firstFields: true }, (errors, fields) => {
          this.valid = !errors;
          this.error = errors ? errors[0].message : '';
          cb && cb(errors);
          this.validating = false;
        });
      },
      resetField() {
        this.valid = true;
        this.error = '';
        let model = this.form.model;
        var names = this.fieldNameArr ;
        var initialValues = this.initialValueArr ;
        for(let i = 0 ; i < names.length; i++){
           model[names[i]] = initialValues[i];
        }
      },
      getRuleObj() {
        var formRules = this.form.rules;
        var ruleObj = formRules ? formRules[this.prop] : undefined;
        return ruleObj;
      },
      getFilteredRule(trigger) {
        var ruleObj = this.getRuleObj();
        //console.info('ruleObj : ' ,ruleObj) ;
        var names = this.fieldNameArr ;
        let retRuleObj = {} ;
        if(!ruleObj){//如果为空直接返回
          return null ;
        }
        if(names.length==0){
           console.warn('names为空，将不进行校验，请检查!') ;
           return null ;
        }
        //console.info('2222222222222222222222') ;
        let isEmptyFlag = true;
        for(let name of names){
           let tmpArr = ruleObj[name] || [];
           let retTmpArr = tmpArr.filter(function(item){
             return filterRuleTrigger(trigger,item) ;
           }) ;
           if(retTmpArr.length>0){
             retRuleObj[name] = retTmpArr ;
             isEmptyFlag = false ;
           }
        }
        
        return (isEmptyFlag ? null : retRuleObj) ;
      },
      onFieldBlur() {
        this.validate('blur');
      },
      onFieldChange() {//当字段变化的时候，如果需要校验，则进行校验，否则不校验
        //主要原因在于，点击‘重置按钮’的时，表单数据的change事件不能进行校验，否则又将显示出校验错误信息
        //console.info('on field change ...') ;
        //console.info('this.validateDisabled ..' + this.validateDisabled) ;
        // if (this.validateDisabled) {//如果之前不能校验，则直接返回，并将状态改为能校验
        //   this.validateDisabled = false;
        //   return;
        // }
        this.validate('change');
      },
      getInitialValueArr() {
        var names = this.fieldNameArr ;
         var values = [] ;
        for(let name of names){
           var value = this.form.model[name] || '';
           values.push(value) ;
        }
        return values ;
      }
    },
    mounted() {
      //console.info('serviceTypeList ',this.serviceTypeList) ;
      //console.info('groupList ',this.groupList) ;
      //console.info('subGroupList ',this.subGroupList) ;
      if (this.prop) {
        this.dispatch('form', 'el.form.addField', [this]);
        this.initialValueArr = this.getInitialValueArr();
        //console.info(' this.initialValueArr : ' ,this.initialValueArr) ;
        //----------------------------
        if(this.getRuleObj()!=null){
            //var validator = this.getRuleObj().validator;
            //var names = this.fieldNameArr ;
            //if (names.length>0 || validator) {
              this.$on('el.form.blur', this.onFieldBlur);
              this.$on('el.form.change', this.onFieldChange);
            //}
        }
        //更新显隐状态
        this._updateVisiableData() ;
      }
    },
    beforeDestroy() {
      this.dispatch('form', 'el.form.removeField', [this]);
    }
  };
  //过滤校验的规则
  function filterRuleTrigger(trigger,item) {
      if(!item){
          return false;
      }
      let fieldTrigger = item.trigger ;
      if(!fieldTrigger|| fieldTrigger.indexOf(trigger)!==-1 ){
          return true ;
      }else{
         return false;
      }
  }
</script>
