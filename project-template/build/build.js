
require('shelljs/global') ;
var config = require('../config/index.js') ;
var ora = require('ora') ;
var path = require('path') ;
var webpack = require('webpack') ;
var webpackConfig = require('./webpack.prod.config.js') ;
var spinner = ora('building for production...') ;
spinner.start() ;
env.NODE_ENV = 'production' ;
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory) ;
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})