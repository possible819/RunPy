const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'electron-main',
  plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 4000,
  },
}
