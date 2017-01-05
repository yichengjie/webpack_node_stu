<template>
    <div class="allInfo_descr pull-left" v-show ="pageBar.isQueryDB">
        <input type="checkbox" id ="queryDBFlagCheckbox" v-bind:checked="queryDBFlag"  
            v-on:click ="clickQueryDBFlag"/>
        <label for="queryDBFlagCheckbox">共查询出<span class="red">{{pageBar.recordCount}}</span>条记录，针对全部记录排序?</label>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex' ;
    export default{
        methods:{
            clickQueryDBFlag(event){
                let queryDBFlag = event.target.checked ;
                //console.info('queryDBFlag : ' + queryDBFlag) ;
                this.updateSimpleState({queryDBFlag}) ;
            },
            ...mapActions([
                'updateSimpleState'
            ])
        },
        computed: mapGetters([
          'pageBar',
          'queryDBFlag'
        ]), 
    }
</script>
<style>

</style>