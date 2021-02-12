let path = require('path');

let conf = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, './dist/js'),
		filename: 'index.js',
		publicPath: 'dist/js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			}
		]
	}
};

module.exports = (env, argv) => {
	conf.devtool = (argv.mode === 'production') ? 'none' : 'eval-cheap-module-source-map';
	return conf;
}