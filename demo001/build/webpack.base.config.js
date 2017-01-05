var webpack = require('webpack');
var path = require('path');
var config = require('../config') ;
var ExtractTextPlugin = require("extract-text-webpack-plugin") ;
var projectRoot = path.resolve(__dirname, '../')

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var baseConfig = {
    entry: {
        app: './src/main.js'
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
          'vue$': 'vue/dist/vue.common.js'
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
            {test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'file'},
            {test: /\.(png|jpg|gif|svg)$/,loader: 'file',query: {name: '[name].[ext]?[hash]'}}
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
         new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ]
};

module.exports = baseConfig;