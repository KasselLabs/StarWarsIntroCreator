const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
  },
  entry: { index: path.resolve(__dirname, 'src', 'js', 'index.js') },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|ttf|woff2?|mp3|ogg)$/,
        use: "file-loader",
        dependency: { not: ['url'] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'RAVEN',
      'FIREBASE_INITIAL',
      'FIREBASE_A',
      'FIREBASE_B',
      'FIREBASE_C',
      'FIREBASE_D',
      'SERVER_API',
      'PAYMENT_PAGE_URL',
      'FACEBOOK_PIXEL',
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
};
