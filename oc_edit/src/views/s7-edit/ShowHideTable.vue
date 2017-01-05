<template>
    <a href = "javascript:void(0)" class="marginLR10" @click ="changeState">
        <span v-show ="showFlag">收起表格</span>
        <span v-show ="!showFlag">填写表格</span>
    </a>
</template>
<script>
  export default {
    props:{
        showHideState:Object,
        name:String,
    },
    computed:{
        showFlag () {
            return this.showHideState[this.name] ;
        }
    },
    methods:{
        changeState(){
            this.showHideState[this.name]  = !this.showFlag;
        }
    }
  } 
</script>