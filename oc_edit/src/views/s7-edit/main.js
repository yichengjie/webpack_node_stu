import Vue from 'vue' ;
//import ElementUI from 'element-ui';
//import ElForm from './components/form.vue' ;
//import ElFormItem from './components/form-item.vue' ;
//Vue.component('el-form', ElForm) ;
//Vue.component('form-item',ElFormItem) ;
require('bootstrap/dist/css/bootstrap.css') ;
require('bootstrap/dist/js/bootstrap.js') ;
require('tui_core_lib') ;
require('tui_dialog_lib') ;
require('tui_drag_lib') ;
require('jq_datepicker_lib') ;
require('jq_timepicker_lib') ;
//require('jq_validate_lib') ;
require('assetsPath/css/common.css') ;
require('assetsPath/css/oc_edit.css') ;
require('assetsPath/css/tui_dialog.css') ;
require('assetsPath/css/jquery_ui.datepicker-modify.css') ;
require('assetsPath/css/jquery-ui-timepicker-addon.css') ;
//require('assetsPath/css/jq_validator.css') ;
//css_path/jquery.autocomplete.css
require('assetsPath/icon/icon.css') ;
//测试时返回假数据
require('mockjsPath/s7-edit.js') ;
require('componentsPath/_index.css') ;
import MyPlugin from 'componentsPath/_index.js' ;
//调用插件
Vue.use(MyPlugin) ;

import App from './App.vue' ;
new Vue({
  el: '#app',
  //render: h => h(App)
  render(h){
    //let h = this.$createElement ;
    return h(App) ;
    //return h('div',[h(App)]) ;
    //return <App/>;
  }
})
