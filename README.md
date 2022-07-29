# 用Webpack从0配置一个React App
如果要创建一个 React项目，第一时间想到的是利用现成工具，CRA、umi等。它们能轻松地帮助我们初始化一个 React项目，并且带有很多默认配置，节省开发时的工作量。

在使用这些工具时，我们并不知道它们具体是如何搭建成一个项目的。对于前端工程师来说，了解这个步骤是非常有必要的。

本文将从0开始手把手带你用 webpack配置一个 React App。



## 起步
首先要做一些基本的工作，包括初始化 NPM仓库、初始化 git、创建项目目录结构和基本的文件等。
1. 创建项目的文件夹，名称为`REACT-APP`。

2. 初始化NPM仓库
在文件夹中执行以下命令。`-y`可以让我们省略 init时点空格的步骤。
```bash
  npm init -y
```

3. 初始化 git

```bash
  git init
```
添加`.gitignore`文件
```
node_modules/

dist
```
4. 创建项目基本目录
```
  .
  +-- public
  +-- src
```

5. 在`public`目录下创建`index.html`
`index.html`是必要的。webpack打包完成的js文件最终会通过`<script>`标签引入到`index.html`。在`index.html`中，我们创建了一个 id为`root`的`<div>`，之后我们会用这个`<div>`作为 React应用的根。
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>REACT APP</title>
</head>

<body>
  <div id="root"></div>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
</body>

</html>
```

6. 在`src`目录下编写基本的 React代码
  - 新建`index.js`
  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  ```
  - 新建`App.js`
  ```javascript
  import React from 'react'
  
  function App() {
    return (
      <div className="App">
        Hello App.js
      </div>
    );
  }

  export default App;
  ```

7. 安装 React的依赖,`react`和`react-dom`
```bash
  npm install react react-dom
```

到此为止，我们已经完成了准备工作，接下来要开始配置 webpack。




## 配置webpack
1. 安装 webpack和项目用到的相关插件和 loader
安装命令如下：
```bash
 npm install webpack webpack-cli --save-dev
 npm install babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
 npm install webpack-dev-server --save-dev
 npm install html-webpack-plugin --save-dev
```
`webpack`是 webpack的主包，用于打包应用。而`webpack-cli`用于在命令行中运行 webpack。

引入`babel-loader`及其相关的包，主要的用途是编译 JSX代码。`@babel/core`是`babel`主包，`@babel/preset-env`用于编译 ES2015+的语法，`@babel/preset-react`用于编译 JSX。

引入`webpack-dev-server`，用于配置开发环境。其提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能。

我们还引入了一个插件`html-webpack-plugin`，作用是自动管理`index.html`文件。
在以`./src/index.js`为入口进行打包时，最终打包出来的是 js文件。并不会为我们生成`index.html`，而这个插件可以在打包时在`dist`目录下生成`index.html`。

2. 在根目录下创建`webpack.config.js`
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // 入口
  mode: "development", // 开发模式
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // 输出包名称
    clean: true, // 在每次构建前清理 /dist 文件夹
  },
  module: {
    // loaders相关配置
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        exclude: /(node_modules|bower_components)/,
        use: ["style-loader", "css-loader"], // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  devServer: {
    // webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:3000 下。
    static: path.join(__dirname, "dist"),
    port: 3000,
  },
  // 插件相关配置
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/public/index.html"), // 以/public/index.html作为模板，相当于把它拷贝到/dist/index.html
    }),
  ],
};

```

3. 配置脚本
在上一步我们已经完成 webpack的配置，最后一步是配置打包和项目启动的命令。
在`package.json`的`script`字段中添加两个命令:
```json
"scripts": {
  "build": "webpack",
  "start": "webpack serve --open"
},
```



## 运行

到此为止，一个React App已经配置完成。

现在可以运行打包命令，可以看到根目录下多了一个`dist`文件夹，里面有两个文件`bundle.js`和`index.html`。
```bash
npm run build
```

也可以运行`npm start `命令进行项目开发，`--open`会在 dev server准备就绪后自动打开浏览器。`webpack-dev-server`在4.0版本后默认开启了HMR。



## 结语

文章所展示的是非常基础的配置，足够跑起一个React应用。其还有很多可优化的地方，如配置各种资源：字体、图片、Less、TypeScript，配置环境变量等，感兴趣的可以根据[指南](https://webpack.docschina.org/guides/)来进行更深入的研究。

文章所涉及到的所有代码放在了 [github](https://github.com/jrr997/webpack-learning-react)。