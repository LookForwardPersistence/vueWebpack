var path =  require('path')
module.exports = {
    build:{
        env: {
            NODE_ENV:'production'
        },
        index: path.resolve(__dirname,'../dist/index.html'),
        assetsRoot:  path.resolve(__dirname,'../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExceptions: ['js','css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: {
            NODE_ENV: 'development'
        },
        port: 9999,
        assetsSubDirectory: 'static',
        assetsPublishPath: '/',
        proxypath: "http://localhot:9999",
        cssSourceMap: true,
        cacheBusting: true,
        notityOnErrors: true,
        errorOverlay: true,
        autoOpenBrowser: true
    }
}