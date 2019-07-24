const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const templates = require('../../utils/getTemplates');
const subTemplates = require('../../utils/getSubTemplates');
const shelvesTemplates = require('../../utils/getShelvesTemplates');
const customElements = require('../../utils/getCustomElements');

const plugins = [
    ...templates,
    ...subTemplates,
    ...shelvesTemplates,
    ...customElements,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: 'assets/css/[name].css'
    }),
];

module.exports = plugins;