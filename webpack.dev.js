const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		// watchContentBase: true,
		hot: true
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: 'style-loader' // creates style nodes from JS strings
			}, {
				loader: 'css-loader' // translates CSS into CommonJS
			}, {
				loader: 'sass-loader' // compiles Sass to CSS
			}]
		}]
	}
})
