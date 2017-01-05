(function(global,factory){
  if(typeof define ==='function' && define.amd){
    define([],factory) ;
  }else if(typeof exports === 'object'){
    module.exports = factory() ;
  }else{
    global.A = factory() ;
  }
}(this,function (){
  var util = require('./util.js') ;
  function A (){
    util.push('a') ;
  }
  return A ;
})) ;
