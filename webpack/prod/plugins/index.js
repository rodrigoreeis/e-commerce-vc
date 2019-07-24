const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

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
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [autoprefixer()]
        }
    }),
    new OptimizeCSSAssets()
];

module.exports = plugins;