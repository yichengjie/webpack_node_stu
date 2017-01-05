var webpack = require('webpack') ;
var express = require('express') ;
var proxyMiddleware = require('http-proxy-middleware') ;


var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.config.js')
  : require('./webpack.dev.config.js') ;



var webpackDevMiddleware = require('webpack-dev-middleware') ;
var webpackHotMiddleware = require('webpack-hot-middleware') ;

var compiler = webpack(webpackConfig);
var config = require('../config') ;
var path = require('path') ;
var opn = require('opn') ;

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port ;
var app = express() ;

/**服务端api 地址配置 */
app.get('/api/hello', function (req, res) {
  var data ={name:'yicj',addr:'henan'} ;
  res.json({data, message: 'success'}) ;
});


var devMiddleware = webpackDevMiddleware(compiler,{
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}) ;

var hotMiddleware = webpackHotMiddleware(compiler) ;
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
   opn(uri,{app: 'chrome'})
  }
})
