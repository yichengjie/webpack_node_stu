var baseWebpackConfig = require('./webpack.base.config.js') ;
var merge = require('webpack-merge') ;
var config = require('../config/index.js') ;
var webpack = require('webpack') ;
var HtmlWebpackPlugin = require('html-webpack-plugin') ;

module.exports = merge(baseWebpackConfig, {
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ]
}) ;