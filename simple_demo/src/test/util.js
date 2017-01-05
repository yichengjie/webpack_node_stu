(function(global,factory){
  if(typeof define === 'function' && define.amd){
    define([],factory) ;
  }else if(typeof exports === 'object'){
    module.exports = factory() ;
  }else{
    global.util = factory() ;
  }
}(global,function(){
  var util = {} ;
  util.arr = [] ;
  return util ;
})) ;



