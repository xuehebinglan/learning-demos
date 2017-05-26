[toc]

### This is about webpack loader && imooc section Four

#### 安装步骤
- 1. `npm init`
- 2. `npm install webpack --save-dev`
- 3. `npm install html-webpack-plugin --save-dev`
- 4. 
- 


#### 4.1 先进行配置

- 1. 在`./src/components/layer` 里面建 `layer.html`,`layer.js`, `layer.less`

> html文件

```html
<div class="layer">
	<div> this is a layer</div>
</div>
```

> js文件

```js
import tpl from './layer.html';

function layer() {
    return {
        name: 'layer',
        tpl: tpl
    };
}
export default layer;
```

> less文件

```css

.layer {
    width: 600px;
    height: 200px;
    background-color: green;
    ·> div {
        width: 400px;
        height: 100px;
        background-color: red;
    }
}

```



- 2. `webpack.config.js` 文件中增加 

```js
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-bundle.js',
        publicPath: 'http://cdn.com/'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
}

```


#### 4.2 loader ==> ES6

- 1. `webpack.config.js`进行配置：



- 2. 安装bable loader `npm install --save-dev babel-loader babel-core`