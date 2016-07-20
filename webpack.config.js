const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const definePlugin = new webpack.DefinePlugin({
  __DEV__: env !== 'production',
  'process.env.NODE_ENV': JSON.stringify(env),
  'process.env.APP_ENV': JSON.stringify('browser')
});
module.exports = {
  entry: {
    main: './src/main.js',
    notification: './src/notification.js',
    updater: './src/updater.js'
  },
  output: {
    path: './compiled',
    publicPath: env === 'production' ? '../compiled/' : 'http://localhost:8080/compiled/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpe?g|png|gif|svg|ttf|woff|woff2|eot)$/i, loader: 'file-loader' },
      { test: /\.css/, loader: 'style-loader!css-loader' },
      { test: /\.scss/, loader: 'style-loader!css-loader!sass-loader' }
    ]
  },
  devtool: env === 'production' ? 'none' : 'eval-source-map',
  plugins: [
    definePlugin,
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  ].concat(env === 'production' ? [new webpack.optimize.OccurenceOrderPlugin()] : [])
};
