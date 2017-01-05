<template>
    <table>
        <thead>
        <tr> <th>销售地类型</th> <th>销售地代码</th><th>金额</th><th>货币类型</th></tr>
        </thead>
        <tbody>
        <tr v-for ="item in list" @click ="handleClickTr(item)" :class ="{'selected_td':item.selected}">
            <td><select name="" class="common_input" ><option value="">选择</option><option value="">国家</option></select></td>
            <td><input type="text" class="common_input" v-model ="item.name"></td>
            <td><input type="text" class="common_input"> </td>
            <td><input type="text" class="common_input"></td>
        </tr>
        </tbody>
    </table>
</template>
<script>
     import emitter from 'componentsPath/mixin/emitter.js' ;
     export default {
         mixins:[emitter],
         props:{
             list:Array
         },
         data () {
             return {
                 obj:{name:'yicj'}
             } ;
         },
         methods:{
             handleClickTr (clickItem) {
                 this.list.forEach(item =>{
                     item.selected = false;
                 }) ;
                 clickItem.selected = true ;
             }
         },
         mounted () {
             //console.info('table 170 mounted ....') ;
             this.dispatch('tableLayout','line_obj',{list:this.list,obj:this.obj}) ;
         }
     }
</script>