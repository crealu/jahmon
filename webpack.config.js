const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, './src', 'index.jsx')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.join(__dirname, './src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.(png|jpe?g)/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    })
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3700,
    proxy: {
      '/api-*': {
        target: 'http://localhost:3220',
        secure: false
      }
    }
  }
}
