var webpack = require('webpack');
var path = require('path');
var config = require('../config') ;
var ExtractTextPlugin = require("extract-text-webpack-plugin") ;
var projectRoot = path.resolve(__dirname, '../') ;

var projectRoot = path.resolve(__dirname, '../') ;
var distPath = projectRoot + "/dist" ;
var srcPath = projectRoot +"/src" ;
var libPath = projectRoot +"/src/lib" ;
var commonPath = projectRoot +"/src/common" ;
var componentsPath = projectRoot +"/src/components" ;
var assetsPath = projectRoot +"/src/assets" ;
var apiPath = projectRoot + "/src/api" ;
var mockjsPath = projectRoot + "/src/mockjs" ;
var utils = require('./util.js') ;


var baseConfig = {
    entry: {
        's7Edit':srcPath+"/main.js"
    },
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
            apiPath:apiPath,
            mockjsPath:mockjsPath,
            assetsPath:assetsPath,
            componentsPath:componentsPath,
            vue: 'vue/dist/vue.common.js',
            lib:libPath,
            tui_core_lib:libPath+"/tui-core/index.js",
            tui_dialog_lib:libPath+"/tui-dialog/index.js",
            tui_drag_lib:libPath+"/tui-drag/index.js",
            jq_datepicker_lib: libPath+"/jq-datepicker/index.js",
            jq_timepicker_lib:libPath+"/jq-timepicker/index.js",
            jq_validate_lib:libPath+"/jq-validate/index.js",
            modal_lib:libPath+"/modal.js",
            iconfont_lib:libPath+"/iconfont/iconfont.js",
            lodash_lib:libPath+"/lodash/lodash.js",
            moment_lib:libPath+"/moment/index.js",
            ajaxfileupload_lib:libPath+"/ajaxfileupload.js",
            is_loading_lib:libPath+"/is-loading/index.js",
            bt_growl_lib:libPath+"/bt-grow/jquery.bootstrap-growl.js",
            HttpClientUtil_lib2:commonPath+"/HttpClientUtil.js",
            modal_helper_lib:commonPath+'/modal.helper.js',
            util_lib:commonPath+"/util.js"
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css"),
            less: ExtractTextPlugin.extract("css!less")
        }
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