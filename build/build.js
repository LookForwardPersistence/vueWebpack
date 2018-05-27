var path = require('path')
var rm = require('rimraf')
const chalk = require('chalk')
var webpack= require('webpack')
var config = require('../config/index')
var webpackconfig = require('./webpack.conf.prd')
console.log(webpack)
console.log("===============================path===========================")
console.log(path)
console.log("You are great")
console.log(webpackconfig)
console.log("config")
console.log(config)

rm(path.join(config.build.assetsPublicPath, config.build.assetsSubDirectory),err => {
    console.log("++++++++++++++++begin+++++++++++++++++")
    if(err) throw err
    webpack(webpackconfig, function (err, stats) {
        if(err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules:false
        }) + '\n')
        console.log(chalk.cyan(' Build complete.\n'))
    })
});


