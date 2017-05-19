
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