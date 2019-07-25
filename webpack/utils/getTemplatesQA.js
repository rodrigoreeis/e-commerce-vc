const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const templatesQA = new Array;
const folder = 'src/views/QA/html-templates/';
fs.readdirSync(folder).map((files) => {
	if (files.match(/\.pug$/)){
		const fileName = files.substring(0, files.length -4);
		templatesQA.push(
			new HtmlWebpackPlugin({
				template: `${folder}/${fileName}.pug`,
				filename: `views/QA/html-templates/${fileName}.html`,
				inject: false,
			})
		);
	}
});

module.exports = templatesQA;