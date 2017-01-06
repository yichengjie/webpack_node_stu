var webpack = require('webpack');
var path = require('path');
var config = require('../config') ;
var ExtractTextPlugin = require("extract-text-webpack-plugin") ;
var projectRoot = path.resolve(__dirname, '../') ;

var SRC_PATH =  path.resolve(__dirname,'../src');
var ASSETS_PATH = path.resolve(__dirname,'../src/assets');
var LIB_PATH = path.resolve(__dirname,'../src/lib');
var DIST_PATH = path.resolve(__dirname,'../dist') ;
var utils = require('./util.js') ;


var baseConfig = {
    entry: SRC_PATH+'/main.js',
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue': 'vue/dist/vue.js',
            'assets': ASSETS_PATH,
            'tui_core_lib':LIB_PATH+"/tui-core/index.js",
            'tui_dialog_lib':LIB_PATH+"/tui-dialog/index.js",
            'tui_drag_lib':LIB_PATH+"/tui-drag/index.js",
            'jq_datepicker_lib': LIB_PATH+"/jq-datepicker/index.js",
            'jq_timepicker_lib':LIB_PATH+"/jq-timepicker/index.js",
            'modal_lib':LIB_PATH+"/modal.js",
            'iconfont_lib':LIB_PATH+"/iconfont/iconfont.js",
            'HttpClientUtil_lib':LIB_PATH+"/HttpClientUtil.js",
            'util_lib':LIB_PATH+"/util.js",
            'lodash_lib':LIB_PATH+"/lodash/lodash.js",
            'moment_lib':LIB_PATH+"/moment/index.js",
            'ajaxfileupload_lib':LIB_PATH+"/ajaxfileupload.js",
            'is_loading_lib':LIB_PATH+"/is-loading/index.js",
            'bt_growl_lib':LIB_PATH+"/bt-grow/jquery.bootstrap-growl.js"
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        preLoaders: [
            {test: /\.vue$/,loader: 'eslint',include: projectRoot,exclude: /node_modules/},
            {test: /\.js$/,loader: 'eslint',include: projectRoot,exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.vue$/,loader: 'vue'},
            {test: /\.js$/,loader: 'babel',include: projectRoot,exclude: /node_modules|lib/},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader")},
            {test: /\.less$/,loader: ExtractTextPlugin.extract("css-loader","less-loader")},
            {test: /\.json$/,loader: 'json-loader'},
            {test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'url',
             query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
             }
            },
            {test: /\.(png|jpg|gif|svg)$/,loader: 'file',
             query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
             }
            }
        ]
    },
    vue: {
       loaders: {
          css: ExtractTextPlugin.extract("css")
       }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ]
};

module.exports = baseConfig;