<template>
    <div>
        <label class="checkbox-inline" v-for="item in options">
            <input type="checkbox"
                :name = "name"  
                :value = "item.value"
                :checked="isChecked(item.value)"
                @click="onChange"
                :disabled="readonly"
                /> {{item.name}}
        </label>
    </div>
</template>
<script>
    import emitter from './mixin/emitter';
    export default {
        name: 'oc-checkbox',
        mixins: [emitter],
        // props:['value','options','name'],
        props:{
            value:Array,
            name:String,
            options:Array,
            readonly:Boolean
        },
        data(){
            return {} ;
        },
        methods:{
            isChecked(val){
               return this.value.includes(val) ;
            },
            onChange(event){
                var flag = event.target.checked ;
                var tmp = event.target.value ;
                var newArr = [] ;
                if(flag){
                    newArr = [...this.value,tmp] ;
                }else{
                   newArr = this.value.filter(function(item){
                      return item != tmp ;
                   }) ;
                }
                this.$emit('input', newArr);
                this.$emit('change', newArr);
                this.dispatch('form-item', 'el.form.change', [newArr]);
            }
        }
    } ;
</script>
<style>
    .checkbox-inline{
        font-size: 12px;
    }
</style>