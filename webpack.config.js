//webpack.config.js
const path = require('path');

const config = {
    entry: ['./src/app.js'],
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: "/js/",
        "filename": 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/,
             loader: 'babel-loader',
             exclude: /node_modules/,
             query: {compact: false}
            }/*,
            { test: /\.jsx$/,
             loader: 'babel-loader',
             exclude: /node_modules/,
             query: {compact: false}
            }*/
        ]
    }
}

module.exports = config