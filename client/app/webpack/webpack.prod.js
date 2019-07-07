const merge = require( "webpack-merge" )
const UglifyJSPlugin = require( "uglifyjs-webpack-plugin" )
const MiniCSSExtractPlugin = require( "mini-css-extract-plugin" )
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" )

const config = require( "./webpack.config" )

module.exports = merge( config, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[hash].js",
  },
  optimization: {
    minimizer: [ 
      new UglifyJSPlugin( {
        cache: true,
        parallel: true,
        sourceMap: true,
      } )
    ]
  },
  module: {
    rules: [ {
      test: /\.scss$/,
      use: [ {
        loader: MiniCSSExtractPlugin.loader,
      }, {
        loader: "css-loader",
        options: {
          importLoaders: 3,
        },
      }, {
        loader: "csso-loader"
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader"
      } ]
    }, {
      test: /\.(eot|ttf|woff2?)$/,
      use: [ {
        loader: "file-loader",
        options: {
          name: "/static/fonts/[name].[ext]",
        },
      } ]
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [ {
        loader: "file-loader",
        options: {
          name: "/static/image/[name].[ext]"
        }
      }, {
        loader: "image-webpack-loader"
      } ]
    }, {
      test: /\.ico$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      } ]
    } ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: "/static/css/[name].[hash].css",
    })
  ]
})
