const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: [
      "react-hot-loader/patch",
      "babel-runtime/regenerator",
      "babel-register",
      "webpack-hot-middleware/client?reload=true",
      "./src/main.js"
    ]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    hot: true,
    stats: {
      colors: true
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
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