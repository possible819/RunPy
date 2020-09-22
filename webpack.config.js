const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'electron-main',
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
}
