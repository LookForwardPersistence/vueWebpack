let config = require('path')

if(!process.env.NODE_ENV){
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let opn = require('opn')
let path = require('path')
let express = require('express')
let webpack = require('webpack')
let proxyMiddleWare = require('http-proxy-middleware')
let webpackConfig = require('./webpack.config.dev')

let port = process.env.port|| config.env.port
let autoOpenBrowser = !!config.dev.autoOpenBrowser

let server = express()
let compilter = webpack(webpackConfig)
let devMiddleware = require('webpack-dev-middleware')(compilter,{
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: true
    }
})

let hotMiddleware = require('webpack-hot-middleware')(compilter)
compilter.plugin('complication', function (complication) {
    complication.plugin('html-webpack-plugin-after-emit', function (data, c) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

let conext = config.dev.context

switch(process.env.NODE_ENV){
    case 'local': var proxypath = 'http://localhost:9999';break;
    default: var proxypath = config.dev.proxypath

}

let options = {
    target: proxypath,
    changeOrigin: true
}
if(context.length){
    server.use(proxyMiddleWare(context, options))
}

server.use(require('connect-history-api-fallback')())

server.use(devMiddleware)
let staticPath = path.posix.join(conifig.dev.assetsPublishPath, config.dev.assetsSubDirectory)
server.use(staticPath, express.static('./static'))

module.exports = server.listen(port, function () {
    if(err){
        console.log(err)
        return
    }
    var  uri = "http://localhost:" + port;
    if(process.env.NODE_ENV !=="testing"){
        open(uri)
    }
})