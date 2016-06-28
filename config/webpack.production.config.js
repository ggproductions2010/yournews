// Development config file for webpack

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var postcssCachify = require('postcss-cachify');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var postcssImport = require('postcss-import');

var cssLoaders = [
  'css-loader',
  'postcss-loader'
];

var webpackConfig = {
  devtool: undefined,
  entry: {
    app: './client/js/app/root.js',
  },
  resolve: {
    root: ['./node_modules'],
    extensions: ['', '.js', '.css']
  },
  output: {
    path: './client',
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          compact: false,
          presets:['es2015', 'react']
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
      __DEV__: !!JSON.parse(process.env.BUILD_DEV || '0'),
      __PRODUCTION__: !!JSON.parse(process.env.BUILD_PRODUCTION || '0')
    }),
    new ExtractTextPlugin('../client/[name].min.css')
  ],
  postcss: function(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      precss,
      autoprefixer({
        browsers: ['> 1%', 'ie 9', 'ie 10']
      }),
      postcssCachify({
        baseUrl: "/res"
      })
    ]
  } 
};

module.exports = webpackConfig;
