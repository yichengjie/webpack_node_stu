<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th v-if="value != null">
          <label class="checkboxAll">
            <input type="checkbox"
                  :checked="value"
                  @click ="handleClickOper"/>全选
          </label>
        </th>
        <th v-for ="title in titleArr">{{title}}</th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>
<script>
export default {
  props:{
    titleArr:Array,
    value:Boolean,
    list:Array
  },
  methods:{
    handleClickOper(event){
      var flag = event.target.checked ;
      this.$emit('input',flag) ;
      this.list.forEach(item => item.checked = flag ) ;
    }
  }
} ;
</script>
<style>
  .checkboxAll{
    margin: 0px ;
  }
  table .checkboxAll input{
    vertical-align: middle ;
    height: 20px ;
    line-height: 20px;
    box-sizing: border-box;
    margin: 0px;
    margin-right: 8px;
  }
</style>
