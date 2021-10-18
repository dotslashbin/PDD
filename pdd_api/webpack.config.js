const path = require('path')
const { ModuleFilenameHelpers } = require( 'webpack' )

module.exports = {
	entry: './src/app.ts',
	devtool: 'inline-source-map',
	target: 'node', 
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
		fallback: {
			zlib: false,
			path: false,
			crypto: false,
			fs: false,
			stream: false, 
			http: false,
			os: false, 
			net: false
		}
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	stats: {
		errorDetails: true
	}
}