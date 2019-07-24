const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const customElements = new Array;
const folder = 'src/views/common/custom-elements/';
fs.readdirSync(folder).map((files) => {
	if (files.match(/\.pug$/)){
		const fileName = files.substring(0, files.length -4);
		customElements.push(
			new HtmlWebpackPlugin({
				template: `${folder}/${fileName}.pug`,
				filename: `views/custom-elements/${fileName}.html`,
				inject: false,
			})
		);
	}
});

module.exports = customElements;