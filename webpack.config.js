const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './app.jsx',
  },
  output: {
    filename: '[name]-[hash].min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', {
                  // Leveraging webpack 2.x tree shaking.
                  // For more info: https://github.com/gajus/babel-preset-es2015-webpack#deprecated
                  modules: false,
                }],
                'es2016',
                'es2017',
                'react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: ['file-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        loader: ['url-loader'],
      },
      {
        test: /\.ejs$/,
        use: ['ejs-loader'],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new WebpackCleanupPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false, sourcemap: false,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: 'body',
      appId: 'app',
      title: 'Todo App',
      filename: 'index.html',
      template: 'public/index.html.ejs',
      favicon: '',
    }),
  ],
  devServer: {
    hot: true,
    contentBase: `${__dirname}/dist`,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  devtool: 'eval',
}
