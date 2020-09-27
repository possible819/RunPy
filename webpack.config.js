const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/render/index.ts',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js',
  },
  target: 'electron-renderer',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
