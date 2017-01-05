//require('./_index.css') ;
import Form from "./form.vue" ;
import FormItem0 from './form-item0.vue' ;
import FormItem1 from './form-item1.vue' ;
import FormItem2 from './form-item2.vue' ;
import Input from './input.vue' ;
import InputNumber from './input-number.vue' ;
import Select from './select.vue' ;
import Checkbox from './checkbox.vue' ;
import Radio from './radio.vue' ;
import Datetimepicker from './datetimepicker.vue' ;
import Textarea from './textarea.vue' ;
import Icon from './icon.vue' ;
function install (Vue,options){
    console.info('inside installed MyPlugin  .........') ;
    if (install.installed) return;
    Vue.component(Form.name, Form);
    Vue.component(FormItem0.name, FormItem0);
    Vue.component(FormItem1.name, FormItem1);
    Vue.component(FormItem2.name, FormItem2);
    Vue.component(Input.name, Input);
    Vue.component(InputNumber.name, InputNumber);
    Vue.component(Select.name, Select);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(Radio.name, Radio);
    Vue.component(Datetimepicker.name, Datetimepicker);
    Vue.component(Textarea.name, Textarea);
    Vue.component(Icon.name, Icon);
    install.installed = true ;
}
if (typeof window !== 'undefined' && window.Vue) {
   console.info('global installed MyPlugin ...') ;
   install(window.Vue);
};


function MyPlugin(){

}

MyPlugin.install = function (Vue, options) {
    install(Vue, options) ;
}

export default MyPlugin ;

