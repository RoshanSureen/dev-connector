// webpack dev file
const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry object: define your main entry point
  entry: {
    app: "./src/main.js"
  },

  // mode: development || production
  mode: "development",

  // output: where to put your compiled code
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"), // absolute path
    publicPath: "/"
  },

  // options for devServer
  devServer: {
    contentBase: "dist",
    hot: true,
    overlay: true, // display error on the browser
    stats: {
      colors: true
    }
  },
  // devtool: for debugging
  devtool: "source-map",

  // module: define your loaders
  module: {
    rules: [
      // javascript babel loader
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader"
        }],
        exclude: /node_modules/
      },
      // css loaders
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      // image loaders
      {
        test: /\.(jpg|png|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "images/[name]-[hash:8].[ext]"
          }
        }]
      },
      // handlebars loader
      {
        test: /\.hbs$/,
        use: [{
          loader: "handlebars-loader"
        }]
      }
    ]
  },
  // plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: "./views/index.hbs",
      // inject: true,
      title: "Dev Connector: A social network for developers"
    })
  ]
};