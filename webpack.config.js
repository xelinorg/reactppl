const path = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = {
  // we use the default entry and output but have the settings here just to know
  // code splitting is happening?
  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js' // code splitting
  },
  //devtool: 'cheap-eval-source-map',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // needed by the react router
    historyApiFallback: true,
    // https check disabled
    disableHostCheck: true,
    compress: true,
    https: true,
    contentBase: './src/',
    // Make webpack-dev-server live-reload when your
    // when source changes
    watchContentBase: true,
    // Display only errors to reduce the amount of output.
    //stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT,
    open: false // Open the page in browser
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [htmlPlugin]
};
