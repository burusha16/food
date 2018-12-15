const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  externals: [/(node_modules|main\..*\.js)/],
  entry: {
    server: './server.ts',
    prerender: './prerender.ts'
  },
  resolve: { extensions: [".js", ".ts"] },
  output: {
    path: path.join(__dirname),
    filename: '[name].js'
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ],
  target: 'node',
  node: {
    __dirname: false
  },
};
