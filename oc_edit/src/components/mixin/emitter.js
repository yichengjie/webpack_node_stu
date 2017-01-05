exports.__esModule = true;
//广播--父->子
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}
exports.default = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      //console.info('dispatch --------') ;
      //console.info('componentName ' ,componentName) ;
      //console.info('eventName ' ,eventName) ;
      //console.info('params ' ,params) ;
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        var tmp = [eventName].concat(params) ;
        //console.info('tmp : ' ,tmp) ;
        //parent.$emit.apply(parent, tmp);
        parent.$emit.apply(parent, tmp);
        //parent.$emit(eventName,params) ;
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      //console.info('broadcast --------') ;
      //console.info('componentName ' ,componentName) ;
      //console.info('eventName ' ,eventName) ;
      //console.info('params ' ,params) ;
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};