var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    background: [
      path.resolve(__dirname, '../src/background.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    sourceMapFilename: './sourcemap/[file].map'
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue!eslint' },
      { test: /\.js$/, loader: 'babel!eslint', exclude: /node_modules/ },
      { test: /\.less$/, loader: 'style!css!less!sourceMap' }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  babel: {
    presets: ['es2015']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    })
  ],
  color: true,
  devtool: '#source-map',
  watch: true
};
