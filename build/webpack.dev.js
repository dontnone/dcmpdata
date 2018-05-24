const webpack = require('webpack')

const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { entryList } = require('./config')

const baseWebpackConfig = require('./webpack.common')


//	定义webpack插件
var webpackPlugin = [
	new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['common'] // 指定一个希望作为公共包的入口
    }),
	new ExtractTextPlugin('css/[name].css'),
	new webpack.NoEmitOnErrorsPlugin(),
	new webpack.HotModuleReplacementPlugin()
]

var entryDev = {}

entryDev.common = ["react","react-dom"]

for (let entry in entryList) {
    if (["common"].includes(entry)) continue;
    if(Array.isArray(entryList[entry])){
        webpackPlugin.push (new HtmlWebpackPlugin({
            title:"效果跟踪-新新贷(dmp)数据管理平台",
            hash:true,
            template: './public/app.html',
            filename: entry + '.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            chunks:["common",entry]
        }));
        entryDev[entry] = entryList[entry]
    }else{
        for(let entryObject in entryList[entry]){
            webpackPlugin.push (new HtmlWebpackPlugin({
                title:"效果跟踪-新新贷(dmp)数据管理平台",
                hash:true,
                template: './public/app.html',
                filename: entry + '/' + entryObject + '.html',
                inject: 'body',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                },
                chunks:["common", entry +  '/' + entryObject]
            }));
            entryDev[entry +  '/' + entryObject] = entryList[entry][entryObject]
        }
    }
        
};

console.log(entryDev)

module.exports = merge(baseWebpackConfig, {
    devtool: 'cheap-module-source-map',
    entry: entryDev,
    plugins: webpackPlugin
});