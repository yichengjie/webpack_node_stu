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
        //console.info('formData : ' ,JSON.stringify(this.formData)) ;
        let flag = _checkFormDataValid(this.formData) ;
        if(!flag){
           alert('表单数据不合法') ;
           return false;
        }
        let id = this.formData.id ;
        //注意这里一定不要直接把formDate传递给下面的新增或更新方式,
        //因为我们下面还要执行resetForm方法,如果下面两个方法中有异步方法，
        //在异步后使用formData的话数据将有问题
        let newData = Object.assign({},this.formData) ;
        if(id&&id.length>0){
          this.updateUser(newData) ;
        }else{
           this.newAddUser(newData) ;
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

  function _checkFormDataValid(formData){
      if(formData.firstName===''){
        return false;
      }
      if(formData.lastName === ''){
        return false;
      }
      if(formData.userName === ''){
        return false;
      }
      return true ;
  }

  function _isUpdatePage(formData){
    if(formData.id&&formData.id.length>0){
      return true ;
    }else{
      return false ;
    }
  }
</script>
