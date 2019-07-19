const path = require('path');
const entry = require('webpack-glob-entry');

module.exports = {
	entry: entry('./src/assets/js/common/*.js'),
	output: {/* eslint-disable no-undef */
		path: path.resolve(__dirname, 'dist/js'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use:{
					loader: 'babel-loader',
				}
			},
		],
	}
};