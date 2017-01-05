<template>
     <div class="table_layout" :style ="{width: width + 'px' }" v-show ="showFlag">
         <slot></slot>
         <TableFooter 
             :footer="footer"
             :handleAddTableLine ="handleAddTableLine" 
             :handleDeleteTableLine ="handleDeleteTableLine">
        </TableFooter>
     </div>
</template>
<script>
    import emitter from 'componentsPath/mixin/emitter.js' ;
    import TableFooter from './TableFooter.vue' ;
    //import emi
    export default {
        props:{
            width:{
                type:String,
                default:'460'
            },
            showFlag:{
                type:Boolean,
                default:false
            },
            footer:{
                type:Boolean,
                default:true
            }
        },
        mixins:[emitter],
        componentName:'tableLayout',
        components:{
            TableFooter
        },
        data () {
            return {
                obj:{},
                list:[]
            } ;
        },
        methods:{
            handleAddTableLine () {
                let newObj = {...this.obj,selected:false} ;
                this.list.push(newObj) ;
            },
            handleDeleteTableLine () {
                if(this.list.length===0){
                    return false;
                }
                let index = this.list.findIndex(item => {
                    return item.selected ;
                }) ;
                if(index===-1){
                    index = this.list.length -1 ;
                }
                this.list.splice(index,1) ;
            }
        },
        created() {
           //console.info('table layout created ....') ;  
           this.$on('line_obj',({list,obj}) => {
               this.obj = obj ;
               this.list = list; 
           }) ;
        }
    }
</script>