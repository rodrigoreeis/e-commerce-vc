const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const shelvesTemplates = new Array;
const folder = 'src/views/common/shelves-templates/';
fs.readdirSync(folder).map((files) => {
	if (files.match(/\.pug$/)){
		const fileName = files.substring(0, files.length -4);
		shelvesTemplates.push(
			new HtmlWebpackPlugin({
				template: `${folder}/${fileName}.pug`,
				filename: `views/shelves-templates/${fileName}.html`,
				inject: false,
			})
		);
	}
});

module.exports = shelvesTemplates;