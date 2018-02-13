const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    context: path.resolve(__dirname, "src"),

    entry: "./js/app.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/js"),
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                loader: "file-loader",
                options: {
                    name: "../images/[name].[ext]"
                }
            },
            {
                test: /\.pug$/,
                loader: "pug-loader",
                options: {
                    pretty: true
                }
            }
        ]
    },

    devServer: {
        stats: "errors-only"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.pug",
            filename: "../index.html"
        }),
        new ExtractTextPlugin("../style/[name].css"),
        new UglifyJsPlugin({
            sourceMap: true
        })
    ]
}