
> learning on the imooc website  to config webpack for real project

# 配置笔记

## 1. 出现的webpack 1.0和2.0的区别

### 1.webpack.config.js

webpack 2.0
```
module.exports = {
    entry: './src/script/main.js',
    output: {
        filename: './dist/js/bundle.js'
    }
}
```

webpack 1.0
```
module.exports = {
    entry: './src/script/main.js',
    output: {
    	path:"./dist/js",
        filename: 'bundle.js'
    }
}
```


## 2. 笔记

- 在 package.json 文件中，“script”选项里面增加 `"webpack": "webpack --config webpack.config.js --progress --display-modules --colors --display-reasons"` 从而可以通过npm webpack 


- webpack.config.js文件中，`entry`接口可以是个数组 `entry: ['./src/script/main.js', './src/script/a.js']`， 也可以是对象  
```
entry:{
	a:'./src/script/a.js',
	main:''./src/script/main.js''
}
```

- webpack-output 里面可以用 `[name]-[hash]-[chunkhash]`来标注。。

- 其中`name`是entry的对象的名字，如‘a’，‘main’，`hash`是每次打包时候的生成的hash，`chunkhash`是每次文件的hash，文件修改了这个就会变。


## 3.【3-1】自动化生成html

- `npm install html-webpack-plugin --save-dev`

- 在webpack.config.js 文件中，增加 `var htmlWebpackPlugin = require('html-webpack-plugin')`

```
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/script/main.js',
        a: './src/script/a.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name]-[chunkhash].js'
    },
    plugins: [
        new htmlWebpackPlugin()
    ]
}
```

- 通过如上代码，会在html文件中增加`<script type="text/javascript" src="main-85c64aa10b053eb7b079.js"></script><script type="text/javascript" src="a-f162d984bf9bd862012f.js"></script>` 也就是2个js文件的分别引用

- 通过如下代码：
```
plugins: [
        new htmlWebpackPlugin({
            template: 'index.html'
        })
    ]
```
相当于以根目录下的index.html为模板，把main.js和a.js给引用进去到指定目录下的index.html中（这块是因为htmlwebpackplugin才有的index.html吗）

- `filename` 是生成的文件名，默认不写，应该是index.html
- `template` 是应用的模版
- `inject` 是选择插入在头部，还是body 

```
plugins: [
        new htmlWebpackPlugin({
            filename: 'new.html',
            template: 'index.html',
            inject: 'head'
        })
    ]
```
