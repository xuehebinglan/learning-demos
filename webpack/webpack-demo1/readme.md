
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