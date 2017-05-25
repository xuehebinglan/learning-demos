var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/script/main.js',
        a: './src/script/a.js',
        b: './src/script/b.js',
        c: './src/script/c.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash].js',
        publicPath: 'http://cdn.com/'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'a.html',
            template: 'index.html',
            inject: false,
            title: 'this is a.html',
            date: new Date(),
            chunks: ['main', 'a']
        }),
        new htmlWebpackPlugin({
            filename: 'b.html',
            template: 'index.html',
            inject: false,
            title: 'this is b.html',
            date: new Date(),
            chunks: ['main', 'b']
        }),
        new htmlWebpackPlugin({
            filename: 'c.html',
            template: 'index.html',
            inject: false,
            title: 'this is c.html',
            date: new Date(),
            chunks: ['main', 'c']
        })
    ]
}

// module.exports = {
//     entry: './src/script/main.js',
//     output: {

//         filename: './dist/js/bundle.js'
//     }
// }