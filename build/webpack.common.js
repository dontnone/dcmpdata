const path = require('path');	//	node路径选择
const webpack = require('webpack');	//	引用webpack
const ExtractTextPlugin = require('extract-text-webpack-plugin');	//	css样式单独打包
module.exports = {
    entry: {},
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: "js/[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/,loader: 'babel-loader'},
            { test: /.(png|woff|woff2|svg|eot|ttf|svg)$/, loader: 'url-loader?limit=4096' },
            { test:/\.(ico)$/ , loader:'file-loader'},
            {
                test: /\.css|less|scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader : 'css-loader?importLoaders=1',
                        options: {
                            sourceMap:true
                        }
                    },{
                        loader : 'postcss-loader',
                        options: {
                            sourceMap:true,
                            plugins: function() {
                                return [
                                    require('autoprefixer')({
                                        //browsers: ['ios >= 7.0']
                                    })
                                ];
                            }
                        }
                    },{
                        loader: "sass-loader",
                        options: {
                            sourceMap:true,
                            outputStyle : 'compact'
                        }
                    }]
                })
            }
        ]
    }
}