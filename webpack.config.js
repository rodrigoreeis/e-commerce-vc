const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
const path = require('path');
const entry = require('webpack-glob-entry');


let templates = [];
var folderPath = 'src/views/common/';
var filterFolds = new RegExp (/[\[\].!'@,><|://\\;&*()_+=]/g, "")
fs.readdirSync(folderPath).filter((fileName, filterFolds) => {
	console.log(fileName)
	let results = fs.readdirSync(`${folderPath}${fileName}/`)
	results.map((file) => {
		if(file.match(/\.pug$/)){
			let filename = file.substring(0, file.length - 4);
			// console.log(filename);
			// templates.push(
				//  new HtmlWebpackPlugin({
					//  template: `${dir}/${filename}.pug`,
					//  filename: `${filename}.html`
				//  })
			//  );
		}
	})
})


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
		...templates
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
			},
			{ 
				test: /\.pug$/,
				use: ['pug-loader']
			},
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