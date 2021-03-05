const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  entry:  {
    main: './src/js/index.js',
    pixi: './src/js/pixi.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/index.html'), // template file
      filename: 'index.html', // output file
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/pixi.html'), // template file
      filename: 'pixi.html', // output file
      chunks: ['pixi']
    }),
    new CleanWebpackPlugin(),
    
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|jpg|jpeg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name].[ext]'
        },
      },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader' }
    ],
  },
};