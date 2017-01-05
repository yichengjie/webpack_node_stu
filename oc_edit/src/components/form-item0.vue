<template>
    <div class="form-group">
        <label class="control-label" :title="label" :class ="{'required':required}" :style="labelStyle" v-if ="label"> 
            {{label}}
        </label>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'oc-form-item0',
        componentName: 'form-item',
        props: {
            label: String,
            labelWidth: String,
            required: {
                type:Boolean,
                default:false
            }
        },//computed:
        data(){
            return {
                visiable:true/*是否可见，如果控件不可见，对应的字段value将会被清空**/
            } ;
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
            }
        },
    }
</script>