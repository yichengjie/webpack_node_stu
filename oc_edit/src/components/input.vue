<template>
      <input
        class="form-control input-sm"
        type="text"
        :name="name"
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :value="value"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
</template>
<script>
  import emitter from './mixin/emitter';
  //import calcTextareaHeight from './calcTextareaHeight';
  export default {
    name: 'oc-input',
    mixins: [emitter],
    props: {
      value: [String, Number],
      placeholder: String,
      autofocus: Boolean,
      name: String,
      maxlength: [String,Number],
      readonly:Boolean,
      disabled:Boolean,
      upper:Boolean
    },
    methods: {
      handleBlur(event) {
        var val = event.target.value || '';
        this.$emit('blur', val);
        this.dispatch('form-item', 'el.form.blur', [val]);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleInput(event) {
        var val = event.target.value;
        if(this.upper){
          val = val.toUpperCase() ;
        }
        this.$emit('input', val);
        //this.$emit('change', val);
        this.dispatch('form-item', 'el.form.change', [val]);
      }
    }
  };
</script>
