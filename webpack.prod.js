const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	devtool: 'source-map',
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: './'
	},
	plugins: [
		new UglifyJsPlugin({
			sourceMap: true,
			uglifyOptions: {
				compress: {
					comparisons: false,
				},
				mangle: false
			}
		}),
		new ExtractTextPlugin('css/bundle.css')
	],
	module: {
		rules: [{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader' // translates CSS into CommonJS
				}, {
					loader: 'sass-loader' // compiles Sass to CSS
				}],
				publicPath: '../'
			})
		}]
	}
})
