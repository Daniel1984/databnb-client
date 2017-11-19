const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SOURCE_DIR = path.resolve(__dirname, 'src');
const DESTINATION_DIR = path.resolve(__dirname, 'public');

const NODE_ENV = process.env.NODE_ENV;
const IS_BUILD = process.env.npm_lifecycle_event === 'build';

module.exports = {
  context: SOURCE_DIR,
  entry: {
    app: './app/index.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: DESTINATION_DIR,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SOURCE_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
                localIdentName: '[name]-[local]__[hash:base64:5]',
                importLoaders: 2,
                minimize: IS_BUILD,
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
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: IS_BUILD,
                sourceMap: true,
              },
            },
          ],
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

  plugins: (() => {
		const plugins = [
      new HtmlPlugin({ template: 'index.html' }),
      new ExtractTextPlugin({
        filename: IS_BUILD ? '[name].[contenthash].css' : '[name].bundle.css',
        allChunks: true,
      }),
		];

		if (IS_BUILD) {
			return [...plugins, new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					screw_ie8: true,
					drop_console: true,
					drop_debugger: true
				},
				output: {
					comments: false
				},
				sourceMap: true
			})];
		}

		return plugins;
	})(),

  devtool: IS_BUILD ? 'source-map' : 'cheap-module-source-map',
  devServer: {
    contentBase: SOURCE_DIR,
    historyApiFallback: true,
  },
};
