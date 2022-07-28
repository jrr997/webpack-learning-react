const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
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
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/public/index.html"), // new一个这个插件的实例，并传入相关的参数
    }),
  ],
};
