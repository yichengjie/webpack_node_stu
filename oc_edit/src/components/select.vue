<template>
    <span class="oc-select-container"
        v-clickoutside="handleClose"
        :style="inputStyle"
        >
        <input type="text"
            ref ="inputselect"
            class="form-control input-sm"
            v-bind:class="{'oc_input_readonly': readonly, 'oc_input_disabled': disabled }"
            :name="name"
            :readonly="readonly"
            :disabled ="disabled"
            :placeholder="placeholder"
            :value="filterKey"
            @input="onInput"
            @click="onClickInput"
         />
        <i class="el-icon-caret-bottom oc-input__icon" @click ="onClickIcon"></i>
        <div class="oc-select-dropdown" v-show="visiable">
            <ul class="oc-select-dropdown__list" v-show="!isEmptyFlag">
                <li class="oc-select-dropdown__item"
                    v-for="item in filterList"
                    @click.stop="handleClickItem(item.value,item.disabled)"
                    :class ="{'selected':item.value == value,'is-disabled': item.disabled}"
                    >
                    {{item.name}}
                </li>
            </ul>
            <p class="oc-select-dropdown__empty" v-show="isEmptyFlag">
                无匹配数据
            </p>
        </div>
    </span>
</template>
<script>
    import emitter from './mixin/emitter';
    import Clickoutside from './util/clickoutside';
    export default {
        name: 'oc-select',
        mixins: [emitter],
        directives: { Clickoutside },
        props: {
            name:String,
            label: String,
            width:Number,
            disabled:Boolean,
            readonly:{
                type:Boolean,
                default:true
            },
            placeholder:String,
            url:String,
            value:[String,Number],
            options:{
                type:Array,
                required:true
            },
            
        },
        computed:{
            inputStyle(){
                var inputWidth = this.width || '';
                if(inputWidth){
                    return {width:inputWidth+"px"};
                }
                return {} ;
            },
            filterList(){
                if((!this.firstFocus)&&this.filterKey&&this.filterKey.trim().length>0){
                    let tmp = this.filterKey.trim() ;
                    return this.options.filter(item=>{
                        if(item.name.indexOf(tmp)!=-1){
                            return true ;
                        }
                        return false;
                    });
                }
                return this.options ;
            },
            isEmptyFlag(){
                return this.filterList.length == 0 ;
            }
        },
        methods:{
            handleClickItem(val,disabled){
                if (disabled !== true) {
                    this.visiable = false;
                    this.$emit('input',val) ;
                    this.dispatch('form-item', 'el.form.change', [val]);
                    //this.dispatch('form-item', 'el.form.blur', [val]);
                }
            },
            onInput(event){
                let val = event.target.value ;
                this.firstFocus = false ;
                this.filterKey = val ;
            },
            onClickInput(){
                this.visiable = !this.visiable ;
                this.firstFocus = true ;
            },
            handleClose(){
                this.visiable = false;
                this.filterKey = getCheckItemName(this.options,this.value) ;
            },
            onClickIcon(){
                this.firstFocus = true ;
                this.visiable = !this.visiable ;
            }
        },
        data(){
            return{
                visiable:false,
                firstFocus:false,
                filterKey: getCheckItemName(this.options,this.value) 
            } ;
        },
        watch:{
            value(val, oldVal){
                //console.info('value is change ' + val) ;
                this.filterKey = getCheckItemName(this.options,val) ;
            }
        },
        mounted(){
            //this.filterKey = this.value ;
            //elem.find('span[name="customeEdit"]').bind('click',function  (event) {
        }
    }

    function getCheckItemName(options,val) { 
        let retObj = null ;
        if(options&&options !=null && options.length>0){
            retObj = options.find(function(item){
                return item.value === val;
            }) ;
        }
        return (retObj ? retObj.name : '空') ; 
    }
</script>