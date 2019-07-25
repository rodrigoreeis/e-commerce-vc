const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const QA = require('../../utils/getTemplatesQA');


const plugins = [
    ...QA,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: 'assets/css/[name]QA.css'
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [autoprefixer()]
        }
    }),
    new OptimizeCSSAssets()
];

module.exports = plugins;