const path = require('path');
const entry = require('webpack-glob-entry')

const plugins = require('./webpack/QA/plugins');
const moduleConfig = require('./webpack/QA/module');

const config = {
    mode: 'production',
	entry: entry('./src/assets/js/common/*.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/js/[name]QA.js'
	},
	plugins,
	module: {
		rules: [
			...moduleConfig
		]
	}
};

module.exports = config;