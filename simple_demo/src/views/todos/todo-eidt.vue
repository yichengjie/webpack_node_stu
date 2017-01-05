<template>
  <div class="todo-edit">
      <div class="row">
        <div class="col-sm-offset-4 col-sm-8">
           <h2>{{pageTitle}}</h2>
        </div>
      </div>
      <form class="form-horizontal" role="form">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-4 control-label">First Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="formData.firstName" />
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-4 control-label">Last Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="formData.lastName" />
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-4 control-label">Username</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model ="formData.userName" />
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-8">
            <button type="button" class="btn btn-default" @click ="handleSaveOper">{{btnTitle}}</button>
          </div>
        </div>
      </form>
  </div>
</template>
<script>
  export default {
    props:{
      formData:Object,
      newAddUser:Function,
      updateUser:Function
    },
    computed:{
      pageTitle(){
        let updateFlag = _isUpdatePage(this.formData) ;
        return updateFlag ? "修改用户信息" : "新增用户信息" ;
      },
      btnTitle() {
         let updateFlag = _isUpdatePage(this.formData) ;
         return updateFlag ? "更新" : "新增" ;
      }
    },
    methods:{
      handleSaveOper(event){
        console.info('formData : ' ,JSON.stringify(this.formData)) ;
        let id = this.formData.id ;
        if(id&&id.length>0){
          this.updateUser(this.formData) ;
        }else{
           this.newAddUser(this.formData) ;
        }
        //重置现有的表单填写数据
        this.resetForm() ;
      },
      resetForm(){/*重置表单*/
        var emptyFormData = { id:'',firstName:'',lastName:'',userName:''} ;
        Object.assign(this.formData,emptyFormData) ;
      }
    }
  } ;

  function _isUpdatePage(formData){
    if(formData.id&&formData.id.length>0){
      return true ;
    }else{
      return false ;
    }
  }
</script>
