var path = require('path') ;

var assetsSubDirectory = "static" ;
var _path = "img/test.png" ;

var t = path.posix.join(assetsSubDirectory, _path) ;

console.info('t : '+ t) ;