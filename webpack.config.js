

const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, "./lib"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: debug ? "gmpixi.js" : "gmpixi.min.js"
  },
  plugins: debug ? [] : [
//    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};




