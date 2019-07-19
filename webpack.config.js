const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const entry = require('webpack-glob-entry');


const config = {
	entry: entry('./src/assets/js/common/*.js', './src/assets/scss/common/*.scss'),
	output: {/* eslint-disable no-undef */
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use:{
					loader: 'babel-loader',
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				  	'sass-loader'
				]
			}
		],
	},
};

module.exports = (env, argv) => {
	if (argv.mode === 'development') {}
	if (argv.mode === 'production') {
		config.plugins.push(
			new OptimizeCSSAssets() // call the css optimizer (minification)
		);
	}
	return config;
};