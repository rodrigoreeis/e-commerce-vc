const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const subTemplates = new Array;
const folder = 'src/views/QA/html-templates/sub-templates';
fs.readdirSync(folder).map((files) => {
	if (files.match(/\.pug$/)){
		const fileName = files.substring(0, files.length -4);
		subTemplates.push(
			new HtmlWebpackPlugin({
				template: `${folder}/${fileName}.pug`,
				filename: `views/html-templates/sub-templates/${fileName}-qa.html`,
				inject: false,
			})
		);
	}
});

module.exports = subTemplates;