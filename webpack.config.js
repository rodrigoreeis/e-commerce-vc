const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
const path = require('path');
const entry = require('webpack-glob-entry');


const templates = [];
const folderPath = 'src/views/common/';
fs.readdirSync(folderPath).filter((folderName, index, arr) => {// eslint-disable-line no-unused-vars
	const folderNameFilter = folderName.replace(/_partials|_layouts/gi, '');
	const results = fs.readdirSync(`${folderPath}${folderNameFilter}/`);
	results.map((file) =>{
		if (file.match(/\.pug$/)){
			const fileName = file.substring(0, file.length - 4);
			templates.push(
				new HtmlWebpackPlugin({
					template: `${folderPath}/${folderName}/${fileName}.pug`, 
					filename: `views/${fileName}.html`,
					inject: false,
				})
			);
		}
	});
});
const subTemplates = [];
const folderSubTemplate = 'src/views/common/html-templates/sub-templates/';
fs.readdirSync(folderSubTemplate).map((files) => {
	if (files.match(/\.pug$/)){
		const fileName = files.substring(0, files.length -4);
		subTemplates.push(
			new HtmlWebpackPlugin({
				template: `${folderSubTemplate}/${fileName}.pug`,
				filename: `views/sub-templates/${fileName}.html`,
				inject: false,
			})
		);
	}
});

const config = {
	entry: entry('./src/assets/js/common/*.js'),
	output: {/* eslint-disable no-undef */
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/js/[name].js',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css',

		}),
		...templates,
		...subTemplates
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
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{ 
				test: /\.pug$/,
				loader: 'pug-loader', query: { pretty: ''}
			},
		],
	},
};

module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		config.module.rules.slice(-1)[0].query.pretty = true;
	}
	if (argv.mode === 'production') {
		// config.module.rules[0].{use:loader:'babel-loader'}
		config.module.rules.slice(-1)[0].query.pretty = false;
		config.plugins.push(
			new OptimizeCSSAssets() // call the css optimizer (minification)
		);
	}
	return config;
};