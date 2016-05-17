'use strict';
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/index',
        common: './src/common'
    },
    output: {
        path: path.join(__dirname, 'static'),
        filename: '[name].bundle.[hash].js',
        chunkFilename: 'chunk/[name].[chunkhash:8].min.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vender.js')
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(eot|woff|woff2|ttf|svg)$/,
            loader: 'file-loader?name=files/[hash].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
