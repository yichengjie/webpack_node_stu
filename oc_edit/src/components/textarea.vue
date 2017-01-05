<template>
    <textarea
        class="form-control input-sm"
        :name="name"
        :disabled="readonly"
        :placeholder="placeholder"
        :value="value"
        :rows="rows"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
    >
    </textarea>
</template>
<script>
  import emitter from './mixin/emitter';
  export default {
    name: 'oc-textarea',
    mixins: [emitter],
    props: {
      value: [String, Number],
      placeholder: String,
      name: String,
      readonly:Boolean,
      rows:{
          type:Number,
          default:3
      }
    },
    methods: {
      handleBlur(event) {
        this.$emit('blur', event);
        this.dispatch('form-item', 'el.form.blur', [this.currentValue]);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleInput(event) {
        var val = event.target.value;
        this.$emit('input', val);
        this.$emit('change', val);
        this.dispatch('form-item', 'el.form.change', [val]);
      }
    },
    mounted(){
        //console.info('rows : ' + this.rows) ;
    }
  };
</script>