const path = require('path')

const config = {
    entry: {
        app: './src/main.js'
    },
    output: {
       path: _dirname + '/dist',
        filename: '[name].js'
    },
    mode: 'production'
}
module.exports = config;