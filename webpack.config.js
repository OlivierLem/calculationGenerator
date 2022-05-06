const path = require('path')
const terserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { emit } = require('process');
const dev = process.env.NODE_ENV === "dev"

let cssLoaders = [
    {
        loader: 'css-loader', 
        options: { importLoaders: 1}
    },
]
if(!dev){
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      "overrideBrowserslist": ["last 1 version", ">1%"]
                    },
                  ],
                ],
            },
        }
    })
}


let config = {
    entry: {
        main: path.resolve(__dirname, 'js/app.js')
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].bundle.js',
        clean: true
    },
    devtool: dev ? "eval-cheap-module-source-map" : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader , ...cssLoaders]
            },
            {
                test:/\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader , ...cssLoaders, 'sass-loader']
            }
        ]  
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        })
    ],
    optimization: {
        minimize: !dev,
        minimizer: []
    }
}
if(!dev){
        config.optimization.minimizer= [new terserPlugin()]
}
module.exports = config