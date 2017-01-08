<template>
    <div class="query-condation">
        <form class="form-inline" role="form">
            <label>查询条件</label>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="FirstName" v-model ="queryCondation.firstName" />
            </div>
            <div class="form-group">
                <input class="form-control" type="text" placeholder="LastName" v-model ="queryCondation.lastName" />
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="UserName" v-model ="queryCondation.userName" />
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        props:{
            queryCondation:Object
        }
    } ;
</script>
<style>
    .query-condation{
        margin: 20px 50px;
    }
</style>