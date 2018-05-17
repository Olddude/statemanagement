const { resolve } = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = {}) => ({
  devtool: env.prod ? 'source-map' : 'inline-source-map',
  entry: {
    app: glob.sync('./src/**/*.ts').map(path => resolve(__dirname, path)),
    styles: resolve(__dirname, './src/styles.css')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: env.prod ? '[name].bundle.[hash].js' : '[name].bundle.js',
  },
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['.ts', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  },
  module: {
    loaders: [ // loaders will work with webpack 1 or 2; but will be renamed 'rules' in future
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {test: /\.ts$/, loader: 'ts-loader'},
        {
            test: /\.css$/, loaders: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
        })
        },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: resolve(__dirname, 'src', 'index.html')}),
    new CopyWebpackPlugin([]),
    new ExtractTextPlugin(env.prod ? 'styles.[hash].css' : 'styles.css'),
  ],
  devServer: {
    port: 3005,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3005'
    }
  }
});
