const webpack = require('webpack');
console.log(`Running build in ${process.env.NODE_ENV}`);
const env = process.env.NODE_ENV;
const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(env),
  'process.env.APP_ENV': JSON.stringify('browser')
});
module.exports = {
  entry: {
    main: './src/main.js',
    notification: './src/notification.js'
  },
  output: {
    path: './build',
    publicPath: env === 'production' ? './build/' : 'http://localhost:8080/build/',
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
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' },
      { test: /\.css/, loader: 'style-loader!css-loader' },
      { test: /\.scss/, loader: 'style-loader!css-loader!sass-loader' }
    ]
  },
  devtool: env === 'production' ? 'none' : 'eval-source-map',
  plugins: [
    definePlugin
  ]
};
