[toc]

> 这是我跟着慕课网的教程一步一步学习来的

# webpack 学习笔记


## 1.基础

- `webpack hello.js hello.bundle.js`
	意思是 hello.js 打包成 hello.bundle.js
- `webpack hello.js hello.bundle.js 'css=style-loader!css-loader'`
	意思是 将里面的css文件添加指定的loader，这样在require的时候就不用每个都加了。
- `--watch`  可以自动打包

- `--progress` 可以进度条

- `--display-modules` 所有的模块

- `--display-reasons` 原因
- ``