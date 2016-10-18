var webpack = require('webpack');

module.exports = {
  entry: ['./public/scripts/app.js'],
  output: {
    filename: "./public/scripts/bundle.js"
  },
  module: {
    loaders: [
      { test: /\/public\/scripts\/\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}