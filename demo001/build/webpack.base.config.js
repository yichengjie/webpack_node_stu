var webpack = require('webpack');
var path = require('path');
var config = require('../config') ;
var ExtractTextPlugin = require("extract-text-webpack-plugin") ;

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
    module: {
        loaders: [
            {test: /\.vue$/,loader: 'vue'},
            {test: /\.js$/,loader: 'babel',exclude: /node_modules|lib/},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader")},
            {test: /\.less$/,loader: ExtractTextPlugin.extract("css-loader","less-loader")},
            {test: /\.json$/,loader: 'json-loader'},
            {test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'file'},
            {test: /\.(png|jpg|gif|svg)$/,loader: 'file',query: {name: '[name].[ext]?[hash]'}}
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
    ]
};

module.exports = baseConfig;