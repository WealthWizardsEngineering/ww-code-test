require('dotenv').config({
  silent: true,
});

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const config = {
    mode: process.env.NODE_ENV,
    watch: process.env.NODE_ENV === 'development',
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
    },
    entry: {
      app: [
        '@babel/polyfill',
        path.join(__dirname, 'src/app/index.jsx'),
      ],
    },
    output: {
      path: path.join(__dirname, '/dist/'),
      filename: 'assets/[name].[hash].js',
      publicPath: '/',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/app/index.html',
        inject: 'body',
      }),
      function () {
        this.hooks.watchRun.tapAsync('rebuild-watcher', (compiler, callback) => {
          console.log(`Built: ${new Date()}`);
          callback();
        });
      },
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      modules: [
        'node_modules',
      ],
      alias: {},
      extensions: ['.js', '.json', '.jsx'],
    },
  };

  return config;
};
