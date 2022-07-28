1. 初始化NPM仓库

```bash
  npm init -y
```

2. 初始化git

```bash
  git init
```
添加`.gitignore`文件
```
node_modules/

dist
```
3. 创建项目基本目录
```
  .
  +-- public
  +-- src
```

4. 在`public`目录下创建`index.html`
```html
<!-- sourced from https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html -->
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>React Starter</title>
</head>

<body>
  <div id="root"></div>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <script src="../dist/bundle.js"></script>
</body>

</html>
```

5. 在`src`目录下编写基本的react代码
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
  - 新建App.js
  ```javascript
  function App() {
    return (
      <div className="App">
        Hello App.js
      </div>
    );
  }

  export default App;
  ```

6. 安装React的依赖,`react`和`react-dom`
```bash
  npm install react react-dom
```

7. 安装webpack和babel-loading
```bash
 npm install webpack webpack-cli --save-dev
 npm install babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
 npm install -D webpack-dev-server
 npm install --save-dev html-webpack-plugin
```
8. 在根目录下创建webpack.config.js
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
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
    static: path.join(__dirname, "dist")
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/public/index.html"), // new一个这个插件的实例，并传入相关的参数
    }),
  ],
};

```