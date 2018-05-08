const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

module.exports = {
	entry: './app/js/app.js',
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'test uq',
			template: 'app/index.html'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			exclude: [/(node_modules|bower_components)/, path.resolve(__dirname, 'app/js/vendor'), /helpers\.js/],
			loader: 'eslint-loader'
		}, {
			test: /\.js$/,
			exclude: [/(node_modules|bower_components)/, path.resolve(__dirname, 'app/js/vendor')],
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: [
				'file-loader?publicPath=./&name=./images/[name]-[hash].[ext]'
			]
		}, {
			test: /\.mp4$/,
			use: [
				'file-loader?publicPath=./&name=./videos/[name]-[hash].[ext]'
			]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [
				'file-loader?publicPath=./&name=./fonts/[name]-[hash].[ext]'
			]
		}, {
			test: /\.(html)$/,
			use: {
				loader: 'html-loader'
			}
		}]
	}
}
