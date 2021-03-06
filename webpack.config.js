const path = require('path')

module.exports = {
  moduleMode: true,
  apps: {
    main: path.join(__dirname, './apps/main')
  },
  backendApps: {
    server: path.join(__dirname, 'server')
  },
  addons: [
    'sharedb' // Plugs in racer-highway client-side scripts
  ],
  frontend: {
    devtool: 'source-map',
    classPrefix: true
  },
  backend: {
    devtool: (process.env.fast ? 'cheap-module-eval-source-map' : 'source-map'),
    uglify: false
  },
  resolve: {
    alias: {
      '~': __dirname,
      'styles': path.resolve('./styles'),
      'project-components': path.resolve('./components'),
      'icons': path.resolve('./public/img/icons'),
      'lib': path.resolve('./lib')
    }
  },
  stylus: {
    import: [
      path.resolve('./styles/variables.styl'),
      path.resolve('./styles/index.styl'),
			path.resolve('./styles/admin.styl')
    ]
  },
  webpackPort: process.env.DEVSERVER_PORT || 3010
}
