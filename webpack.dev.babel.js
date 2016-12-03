import webpack from 'webpack'
import config from './webpack.prod.babel.js'

config.cache = true
config.devtool = 'inline-eval-cheap-source-map'

for (let key in config.entry) {
  config.entry[key] = [config.entry[key], 'webpack-hot-middleware/client', 'eventsource-polyfill']
}

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({'process.env': {
    NODE_ENV: `"${process.env.NODE_ENV}"`
  }}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]

config.module.loaders = [
  {include: /\.json$/, loaders: ['json']},
  {include: /\.js$/, loaders: ['babel'], exclude: /(node_modules)/},
  {include: /\.jsx$/, loaders: ['react-hot', 'babel', 'react-prefix'], exclude: /(node_modules)/},
  {include: /\.css$/, loaders: ['style', 'css']}
]

config.devServer = {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  lazy: false,
  quiet: false,
  noInfo: true,
  historyApiFallback: true,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
}

module.exports = config
