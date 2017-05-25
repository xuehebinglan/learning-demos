[toc]
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
            inject: 'head',
            title: 'this is the plugin's title'
        })
    ]
```


## 3.【3-2】自动化生成html


- ### 一、 在htmlWebpackPlugin里面放的对象，都可以放到模版里面进行引用。

```js
 plugins: [
        new htmlWebpackPlugin({
            filename: 'new.html',
            template: 'index.html',
            inject: 'head',
            title: "this is plugin's title",
            date: new Date(),
        })
    ]
```
- 如上，模版是index.html

```js
<%= htmlWebpackPlugin.options.title %>
```

- 在index.html里面加上上面的代码，就可以用到plugins里面的title。
- `new Date()`这种都可以诶


- ### 二、 for循环

```js
<% for (var key in htmlWebpackPlugin) {%>
    <%= key %>
<% }%>
```


-  `<% %>` 这是模板语法

- `<%= %>` 加上=相当于 输出 的感觉

```js
<% for (var key in htmlWebpackPlugin.files) {%>
        <%= key %> : <%= JSON.stringify(htmlWebpackPlugin.files[key])%>
    <% }%>

    <% for (var key in htmlWebpackPlugin.options) {%>
        <%= key %> : <%= JSON.stringify(htmlWebpackPlugin.options[key])%>
    <% }%>
```

- ### 三、如何将a.js 和main.js分别放在head和body
1. 在头部放入 `<script src="<%= htmlWebpackPlugin.files.chunks.main.entry %>"></script>`
2. body里面放入`<script src="<%= htmlWebpackPlugin.files.chunks.a.entry %>"></script>`
3. package.json文件里面,`inject:false`

- ### 四、 output里面的publicPath可以为整体增加路径

```js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash].js',
        publicPath: 'http://cdn.com/'
    },
```

```html
<script src="http://cdn.com/js/main-b478c90d30da7bbc9444.js"></script>
```
也就是如果我想增加我的域名，就可以啦

- ### 五、 给plugin增加 minify 格式化

```js
    minify: {
        removeComments: true,
        collapseWhitespace: true
    }
```

`removeComments`删除注释
`collapseWhitespace`删除空格


## 3.【3-3】自动化生成html--多页面

- ### 一、如何生成多个html
    ```js
     plugins: [
        new htmlWebpackPlugin({
            filename: 'a.html',
            template: 'index.html',
            inject: 'body',
            title: 'this is a.html',
            date: new Date(),
            chunks: ['main', 'a']
        }),
        new htmlWebpackPlugin({
            filename: 'b.html',
            template: 'index.html',
            inject: 'body',
            title: 'this is b.html',
            date: new Date(),
            chunks: ['main', 'b']
        }),
        new htmlWebpackPlugin({
            filename: 'c.html',
            template: 'index.html',
            inject: 'body',
            title: 'this is c.html',
            date: new Date(),
            chunks: ['main', 'c']
        })
    ]
    ```
- 在plugin里面插入多个new，因为plugin里面是个数组，所以有几个就可以生成几个。

- #### `filename` 用来改变名字
- #### `chunks` 用来改变对应的文件，chunk里面有几个，对应的就会在那个html插入哪个文件。
- 此处对应的是 entry里的对象名，`entry`和`chunks`对应。
- #### `excludeChunks` 意思是排除了哪个其他都包含。
- #### 此处应该注意，`index.html`这个文件里面，应该将之前有关chunks的引用语句去掉，否则会报错。可以长成如下。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>   
</head>
<body>
    <%= htmlWebpackPlugin.options.date %>
    <!-- 我是一行注释-->  
</body>
</html>
```

- #### 如果不想要publicPath这个前缀，则需要如下(20:22)：
```
<%= htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length) %>
```
上面的是会生成`js/main-e1e7b6a0d2e8593d0d16.js`


如果是下面的
```
<%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
```

则会将main.js里面的所有代码直接插入指定的位置。


- #### 如果想要让每个html头文件插入main.js的源代码就用上面的，如果同时希望用src的方式分别插入 `a.js`, `b.js`, `c.js`则需要如下配置：
- 首先，`inject:false`
- 其次，在制定的位置插入如下代码：

```
<% for (var k in htmlWebpackPlugin.files.chunks) { %>
    <% if (k !== 'main') { %>
    <script src="<%= htmlWebpackPlugin.files.chunks[k].entry %>"></script>
    <% } %>
<% } %>
```
那么就会在a.html里面生成a.js，b.html里面有b.js


