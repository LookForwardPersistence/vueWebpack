let path =  require('path')
let fs = require('fs')
let utils = require('./utils')
let webpack = require('webpack')
let config = require('../config')
let merge = require('webpack-merge')
let webpackzipplugin = require('zip-webpack-plugin')
let basewebpackconfig = require('./webpack.config.base')
let copywebpackplugin = require('copy-webpack-plugin')
let htmwebpackplugin = require('html-webpack-plugin')
let extracttextwebpackplugin = require('extract-text-webpack-plugin')
let optimizecssplugin = require('optimize-css-assets-webpack-plugin')
let visualizer = require('webpack-visualizer-plugin')

let env = config.build.env

console.log("====================删除文件================")
//删除文件
function deleteFolder(path){
    let files =[]
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        console.log("++++++++++++files++++++++++")
        console.log(files);
        files.forEach(function (file, index) {
           let curpath = path +  '/' + file
            if(fs.statSync(curpath).isDirectory()){
               deleteFolder(curpath)
           } else {
                fs.unlinkSync(curpath)
            }
        });
        fs.rmdirSync(path)
    }
}
const rootPath = __dirname.replace('\\build', '');
console.log("==rootPath==" + rootPath)
deleteFolder(rootPath + '/dist');

let $sourceMap = config.build.productionSourceMap
let webconfig = merge(basewebpackconfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: $sourceMap,
            extract: true
        })
    },
    devtool: $sourceMap?"#source-map": false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[id].jd')
    },
    plugins:[
        new webpack.DefinePlugin(
            {
                'process.env': env
            }
        ),
       /* new webpack.optimize.UglifyJsPlugin({
            compress:{
                warning: false,
                drop_debugger: !$sourceMap,
                drop_console: !$sourceMap
            }
        }),*/
        new extracttextwebpackplugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        new optimizecssplugin({
            cssProcessorOptions:{
                safe: true
            }
        }),
        new htmwebpackplugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minity: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
           },
            chunksSortMode: 'dependency'
        })
    ]

})

module.exports = webconfig