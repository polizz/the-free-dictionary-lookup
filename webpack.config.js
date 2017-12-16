const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// console.log('env', JSON.stringify(process.env, null, 2))

module.exports = (env, ...flags) => Object.assign({
  entry: {
    index: './src/index.js',
    // init: './src/init.js',
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
    // Copy all except sources and tests (TODO: no tests yet).
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
      // Production Plugins
      new MinifyPlugin(),
    ] : [
      // Development Plugins
    ]),
  ],
}, process.env.BABEL_ENV === 'production' ? {
  // Production Props
} : {
  // Development Props
  devtool: 'source-map',
})
