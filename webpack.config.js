const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'My organization',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: { localIdentName: '[name]__[local]--[hash:base64:8]' },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss/,
        exclude: /\.module.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.css/, use: ['style-loader', 'css-loader'] },
      { test: /\.(cur|png|jpeg)$/, loader: 'url-loader' },
      {
        test: /\.svg/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
};
