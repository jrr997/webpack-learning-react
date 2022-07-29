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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/public/index.html"), // 以/public/index.html作为模板，相当于把它拷贝到/dist/index.html
    }),
  ],
};
