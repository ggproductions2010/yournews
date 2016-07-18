// Production config file for webpack
// Overwrites the development parts of the development config file

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var webpackConfig = require('./webpack.config');
var autoprefixer = require('autoprefixer');
var postcssCachify = require('postcss-cachify');

var cssLoaders = [
  'css-loader',
  'postcss-loader'
];

Object.assign(webpackConfig, {
  cacheDirectory: false,
  devtool: undefined,
  output: {
    path: '../static/js',
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          cacheDirectory: false,
          compact: false
        },
        exclude: [/node_modules/]
      },
      { 
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", cssLoaders.join('!'))
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __DEV__: !!JSON.parse(process.env.BUILD_DEV || '0'),
      __PRODUCTION__: !!JSON.parse(process.env.BUILD_PRODUCTION || '0')
    }),
    new ExtractTextPlugin('../css/[name].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      },
      mangle: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CompressionPlugin({
      // asset: "[name].gz",
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.map$/,
      minRatio: 1.5
    })
  ]
});

module.exports = webpackConfig;
