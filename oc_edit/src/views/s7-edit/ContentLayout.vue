<template>
    <div class="content_layout">
        <span class="left">{{title}}</span>
        <div class="right">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            title:String
        }
    }
</script>