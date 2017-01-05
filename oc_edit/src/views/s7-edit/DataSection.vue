<template>
      <div class="data_section " ng-controller="ChargeConfirmCtrl">
            <div class="title_layout">
                <span class="left">{{left}}</span>
                <span class="right text-info"> {{right}} </span>
            </div>
            <slot></slot>
      </div>
</template>
<script>
    export default {
        props:{
            left:String,
            right:String
        }
    }
</script>