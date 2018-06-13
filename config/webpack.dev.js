const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    vendor: ["react", "react-dom"],
    app: [
      "react-hot-loader/patch",
      "babel-runtime/regenerator",
      "babel-register",
      "./src/main.js",
      "webpack-hot-middleware/client?reload=true",
    ]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    overlay: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  },
  devtool: "#source-map",
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }]
      },
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
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            root: path.resolve(__dirname, "../public"),
            attrs: ["img:src"]
          }
        }]
      },
      {
        test: /\.hbs$/,
        use: [{
          loader: "handlebars-template-loader",
          query: {
            root: path.resolve(__dirname, "../public"),
            parseDynamicRoutes: true
          }
        }]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]"
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new HTMLWebpackPlugin({
      template: "./views/index.hbs",
      title: "Dev Connector: A Social network for developers"
    })
  ]
}