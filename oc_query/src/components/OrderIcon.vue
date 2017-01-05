<template>
    <svg class="icon tb_order" aria-hidden="true" >
        <use xlink:href="#icon-sort-small" v-if ="orderTitleName != propName"></use>
        <use xlink:href="#icon-sort-small1" v-if ="orderTitleName == propName && tableTitleOrder[propName]"></use>
        <use xlink:href="#icon-sort-small-copy" v-if ="orderTitleName == propName  && !tableTitleOrder[propName]"></use>
    </svg>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex' ;
    export default{
       props:['propName'],
       computed: mapGetters([
            'orderTitleName',
            'tableTitleOrder'
        ])
    }
</script>
<style>

</style>