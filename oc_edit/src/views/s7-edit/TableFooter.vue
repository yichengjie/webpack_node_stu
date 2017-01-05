<template>
    <div class="table_footer" v-show ="footer">
        <button type="button" class="btn btn-success btn-sm"
            @click ="this.handleAddTableLine">增加一行</button>
        <button type="button" class="btn btn-default btn-sm"
            @click = "this.handleDeleteTableLine">删除一行</button>
    </div>
</template>
<script>
    export default {
        props:{
            handleAddTableLine:Function,
            handleDeleteTableLine:Function,
            footer:{
                type:Boolean,
                default:true
            }
        }
    }
</script>