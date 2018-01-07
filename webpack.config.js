

const mode = process.env.NODE_ENV;
const webpack = require('webpack');
const path = require('path');

const phpTest = {
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "./test/php-test"),
    filename:  "gmpixi.js"
  }
};

const nodeTest = {
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "./test/node-test"),
    filename:  "gmpixi.js"
  }
};

const minified = {
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename:  "gmpixi.min.js"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ 
      mangle: true, 
      sourcemap: false
    })
  ]
}

const normal = {
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename:  "gmpixi.js"
  }
}

module.exports = ((m) => {
  console.log("Building for: '" + m + "'");
  switch(m) {
    case "production":
      return [minified, normal];
    case "minified":
      return minified;
    case "development":
      return normal;
    case "php":
      return phpTest;
    case "node":
      return nodeTest;
    default:
      return [phpTest, nodeTest];
  }
})(mode);

