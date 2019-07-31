const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const TemplatesQA = require('../../utils/getTemplatesQA');
const SubTemplatesQA = require('../../utils/getSubTemplatesQA');

const plugins = [
    ...TemplatesQA,
    ...SubTemplatesQA,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: 'assets/css/[name]-qa.css'
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [autoprefixer()]
        }
    }),
    new OptimizeCSSAssets()
];

module.exports = plugins;