var baseWebpackConfig = require('./webpack.base.config.js') ;
var merge = require('webpack-merge') ;
var config = require('../config/index.js') ;
var webpack = require('webpack') ;

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
    ]
}) ;