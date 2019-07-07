const webpack = require( "webpack" )
const merge = require( "webpack-merge" )
const path = require( "path" )

const config = require( "./webpack.config" )

module.exports = merge( config, {
  mode: "development",
  watch: true,
  watchOptions: {
    ignored: path.resolve( "node_modules" ),
  },
  devtool: "cheap-eval-source-map",
  devServer: {
    hot: true,
    compress: true,
    open: "chromium",
    publicPath: "/",
    contentBase: path.resolve( "app" ),
    watchContentBase: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      }, { 
        test: /\.(eot|ttf|woff2?|png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
} )
