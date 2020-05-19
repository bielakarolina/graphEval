const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    entry:['babel-polyfill', './src/index.js'],
    output:{
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    devServer: {
        host: '0.0.0.0',
        useLocalIp: true,
        contentBase: path.resolve(__dirname, 'dist/js'),
        compress: true,
        historyApiFallback: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "index.html"
        })
    ]
};