var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require('../build/webpack.dev');

var compiler = webpack(config);

var path = require('path');
var fs = require('fs');
var url = require('url');

const PORT = 8888

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
    return path.resolve(__dirname, relativePath);
}
var httpProxyMiddleware = require('http-proxy-middleware');
function addMiddleware(devServer) {
    var options = {
        target: 'http://localhost:' + PORT, //目标服务器地址
        changeOrigin: true,
        ws: true,
    };
    var apiProxy = httpProxyMiddleware( options );
    devServer.listeningApp.on('upgrade', apiProxy.upgrade);
}
var devServer = new WebpackDevServer(compiler, {
    historyApiFallback: {
        disableDotRule: true,
        htmlAcceptHeaders: ['text/html', '*/*']
    },
    compress: true,
    contentBase: resolveApp('./dist'),
    hot: true,
    stats: { colors: true }
});
addMiddleware(devServer);
devServer.listen(PORT, "localhost", function() {
    var openBrowser = require('react-dev-utils/openBrowser');
    if (openBrowser('http://localhost:'+ PORT)) {
        console.log('The browser tab has been opened!');
    }
});