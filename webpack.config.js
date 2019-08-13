const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.gltf$/, use: 'raw-loader' },
            { test: /\.obj$/, use: 'raw-loader' },
            { test: /\.mtl$/, use: 'raw-loader' },
            { test: /\.jpg$/, use: 'raw-loader' }
        ]
    }
};