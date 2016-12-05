const path = require('path')

module.exports = {
  moduleMode: true,
  apps: {
    main: path.join(__dirname, 'apps/main')
  },
  backendApps: {
    server: path.join(__dirname, 'server')
  },
  addons: [
    'sharedb' // Plugs in racer-highway client-side scripts
  ],
  frontend: {
    devtool: 'source-map',
    
  },
  backend: {
    devtool: (process.env.fast ? 'cheap-module-eval-source-map' : 'source-map'),
    uglify: false
  },
  resolve: {
    alias: {
      '~': __dirname
    }
  },
  stylus: {
    import: [
    ]
  },
  webpackPort: process.env.DEVSERVER_PORT || 3010
}
