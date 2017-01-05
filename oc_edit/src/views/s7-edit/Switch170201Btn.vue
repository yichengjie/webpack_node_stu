<template>
    <div class="table_control">
        <span class="discountBtn marginR15" :class ="{'discountCheck':!formData.discountOrNot}" @click ="handleSwitchDiscount(false)">全额</span>
        <span class="discountBtn marginR15" :class ="{'discountCheck':formData.discountOrNot ,'is-disabled':list163.length==0}" @click ="handleSwitchDiscount(true)">折扣</span>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props:{
            formData:Object,
            list163:Array
        },
        methods:{
            handleSwitchDiscount (flag) {
                if(this.formData.discountOrNot === flag || this.list163.length ===0){
                    return false;
                }
                //当需要切换时
                this.formData.discountOrNot = flag;
                let {list170VO,list201VO} = this.formData;
                if(flag){//如果切换到折扣,清空170
                   console.info('切换到折扣....'+ this.list163.length) ;
                   list170VO.splice(0,list170VO.length) ; 
                   for(let item of this.list163){
                       var tmpObj = {...item} ;
                       list201VO.push(tmpObj) ;
                   }
                }else{//如果切换到全额清空201的数据
                    list201VO.splice(0,list201VO.length) ;
                }
            }
        }
    } 
</script>