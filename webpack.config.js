const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, ...flags) => Object.assign({
  entry: {
    index: './src/index.js',
    contextHandler: './src/contextHandler.js',
  },
  output: {
    path: path.join(__dirname, 'dist/src'),
    filename: '[name].js',
  },
  resolve: {
    extensions: [ '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          'babel-loader',
          // 'eslint-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        context: './src',
        from: './**/*',
      },
    ], {
      ignore: [
        '**/src/**',
        '*.js',
      ],
    }),
    ...(process.env.BABEL_ENV === 'production' ? [
      new MinifyPlugin(),
    ] : []),
  ],
}, process.env.BABEL_ENV === 'production' ?
  {}
  :
  { devtool: 'source-map' })
