const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = {
  entry: {
    vendor: ["react", "react-dom"],
    app: ["./src/main.js"]
  },
  mode: "production",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
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
            loader: MiniCSSExtractPlugin.loader
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
    new OptimizeCSSAssetsPlugin(),
    new MiniCSSExtractPlugin({
      filename: "[name]-[contenthash].css"
    }),
    new HTMLWebpackPlugin({
      template: "./views/index.hbs",
      title: "Dev Connector: A Social network for developers"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BrotliPlugin()
  ]
}