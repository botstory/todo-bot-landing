require('babel-polyfill');

var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');


var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './dist');
const sourcePath = path.resolve(projectRootPath, './src');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
// var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
// var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

console.log('process.env.PUBLIC_PATH');
console.log(process.env.PUBLIC_PATH);

let publicPath = process.env.PUBLIC_PATH;
if (!publicPath) {
  publicPath = '/';
}

module.exports = {
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      // 'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
      // 'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
      './src/client.js'
    ],
    vendor: [
      // 'react'
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    pathinfo: isVerbose,
    publicPath: publicPath,
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  bail: !isDebug,
  cache: isDebug,
  resolve: {
    modules: [
      'node_modules',
      sourcePath,
    ]
  },

  performance: {
    hints: true,
    maxInitialChunkSize: 1024 * 1024,
    maxAssetSize: 1024 * 1024,
  },

  plugins: [
    new CleanWebpackPlugin([assetsPath], {
      root: projectRootPath,
      verbose: true,
      dry: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 3000,
    host: '0.0.0.0',
    inline: true
  }
};
