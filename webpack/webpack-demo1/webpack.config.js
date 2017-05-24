var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/script/main.js',
        a: './src/script/a.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash].js',
        publicPath: 'http://cdn.com/'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'new.html',
            template: 'index.html',
            inject: false,
            title: "this is plugin's title",
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
}

// module.exports = {
//     entry: './src/script/main.js',
//     output: {

//         filename: './dist/js/bundle.js'
//     }
// }