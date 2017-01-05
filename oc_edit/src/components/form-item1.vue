<template>
  <div class="form-group" :class ="{'has-error':error !== ''}" v-show ="visiable">
    <label class="control-label" :title="label" :class ="{'required':required}" v-bind:style="labelStyle" v-if ="label"> 
      {{label}}
    </label>
    <div :class="contentClass">
      <slot></slot>
    </div>
    <div class="error-container" :class ="{'tooltip-error':tooltip}" :data-title ="error" v-show="error !== ''">
      <span class="error-info">{{error}}</span>
    </div>
  </div>
</template>

<script>
  import AsyncValidator from 'async-validator';
  import emitter from './mixin/emitter';
  import mixin2 from './mixin/form-item.js' ;

  export default {
    name: 'oc-form-item1',
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
      rules: [Object, Array],
      span:{
        type:Number,
        default:4
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
      contentClass() {
        return 'col-sm-' + this.span ;
      },
      form() {
        var parent = this.$parent;
        while (parent.$options.componentName !== 'form') {
          parent = parent.$parent;
        }
        return parent;
      },
      fieldValue: {
        cache: false,
        get() {
          var model = this.form.model;
          if (!model || !this.prop) { return; }
          var temp = this.prop.split(':');
          var retVal = temp.length > 1
            ? model[temp[0]][temp[1]]
            : model[this.prop] ;
          //console.info('temp : ' + temp , "retval : " + retVal) ;
          return retVal;
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
        initialValue: null,
      };
    },
    methods: {
      validate(trigger, cb) {
        //如果控件不可见，则不做表单校验
        if(!this.visiable){
           cb && cb();
           return true;
        }
        //进行验证先关的操作
        var rules = this.getFilteredRule(trigger);
        if (!rules || rules.length === 0) {
          cb && cb();
          return true;
        }
        this.validating = true;
        var descriptor = {};
        descriptor[this.prop] = rules;
        var validator = new AsyncValidator(descriptor);
        var model = {};
        model[this.prop] = this.fieldValue;
        //console.info('model : ' ,model) ;
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
        let value = this.fieldValue;
        //console.info('-------------> this prop name ['+this.prop+'] value : ' + value) ;
        if (Array.isArray(value) && value.length > 0) {
          model[this.prop] = [];
        } else if (value) {
          model[this.prop] = this.initialValue;
        }
      },
      getRules() {
        var formRules = this.form.rules;
        var selfRuels = this.rules;
        formRules = formRules ? formRules[this.prop] : [];
        return [].concat(selfRuels || formRules || []);
      },
      getFilteredRule(trigger) {
        var rules = this.getRules();
        return rules.filter(rule => {
          return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
        });
      },
      onFieldBlur() {
        this.validate('blur');
      },
      onFieldChange() {//当字段变化的时候，如果需要校验，则进行校验，否则不校验
        //主要原因在于，点击‘重置按钮’的时，表单数据的change事件不能进行校验，否则又将显示出校验错误信息
        // if (this.validateDisabled) {//如果之前不能校验，则直接返回，并将状态改为能校验
        //   this.validateDisabled = false;
        //   return;
        // }
        this.validate('change');
      },
      getInitialValue() {
        var value = this.form.model[this.prop];
        if (value === undefined) {
          return value;
        } else {
          return JSON.parse(JSON.stringify(value));
        }
      }
    },
    mounted() {
      if (this.prop) {
        this.dispatch('form', 'el.form.addField', [this]);
        this.initialValue = this.getInitialValue();
        let rules = this.getRules();
        if (rules.length) {
          this.$on('el.form.blur', this.onFieldBlur);
          this.$on('el.form.change', this.onFieldChange);
        }
        //更新显隐状态
        this._updateVisiableData() ;
      }
    },
    beforeDestroy() {
      this.dispatch('form', 'el.form.removeField', [this]);
    }
  };

</script>
