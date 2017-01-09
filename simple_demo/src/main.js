import Vue from 'vue'
//import App from './views/query/App.vue' ;
//import App from './views/edit/App.vue' ;
import App from './views/todos/App.vue' ;
require('bootstrap/dist/css/bootstrap.css') ;
require('bootstrap/dist/js/bootstrap.js') ;

new Vue({
  el: '#app',
  render (h) {
    return h(App) ;
  }
})



