const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const { NODE_ENV } = process.env;
const IS_BUILD = process.env.npm_lifecycle_event === 'build';

const config = {
  devtool: IS_BUILD ? 'source-map' : 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    filename: IS_BUILD ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]-[local]__[hash:base64:5]',
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      env: NODE_ENV,
    }),
    new ExtractTextPlugin({
      filename: IS_BUILD ? '[name].[contenthash].css' : '[name].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(IS_BUILD ? 'production' : 'local'),
        HOSTMAKER_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new CopyPlugin([
      { from: 'src/assets/cover.png', to: '.' },
      { from: 'src/robots.txt', to: '.' },
    ]),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
  },
};

if (IS_BUILD) {
  config.plugins = [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ];

  config.optimization = {
    minimize: true,
  };
}

module.exports = config;
