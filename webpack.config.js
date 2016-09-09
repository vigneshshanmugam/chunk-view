const webpack = require('webpack');

module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        path: './public',
        filename: '[name].bundle.js',
        libraryTarget: 'this'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            }
        })
    ],
    noInfo: true,
    colors: true
};