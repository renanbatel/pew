const path = require( "path" ) 
const HtmlWebpackPlugin = require( "html-webpack-plugin" )

module.exports = {
  context: path.resolve( "app" ),
  resolve: {
    extensions: [ ".jsx", ".js" ],
  },
  entry: "./src/index.jsx",
  output: {
    path: path.resolve( "dist" ),
    filename: "[name].js",
  },
  module: {
    rules: [ 
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin( {
      template: "./index.html",
      filename: "./index.html",
    } ),
  ],
}
