import './config'
import path from 'path'
import webpack from 'webpack'

module.exports = {
    target: 'web',
    cache: false,
    context: __dirname,
    devtool: false,
    entry: {
        main: './apps/main'
    },
    output: {
        path: path.resolve('./public/js'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].[id].js',
        publicPath: '/js/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: { keep_fnames: true }
        })
    ],
    module: {
        loaders: [
	          {test: /\.svg$/,loaders: ['babel?presets[]=es2015&presets[]=stage-0&presets[]=react', 'react-svg?jsx=1'],exclude: /(node_modules)/},
            { include: /\.json$/, loaders: ['json'] },
            { include: /\.js$/, loaders: ['babel'], exclude: /(node_modules)/ },
            { include: /\.jsx$/, loaders: ['babel', 'react-prefix', 'strip-loader?strip[]=console.log'], exclude: /(node_modules)/ }
        ]
    },
    resolveLoader: {
        root: path.resolve('./node_modules')
    },
    resolve: {
        alias: {
            amelisa: path.resolve('./node_modules/amelisa'),
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
            graphql: path.resolve('./node_modules/react')
        },
        extensions: ['', '.json', '.js', '.jsx']
    },
    node: {
        __dirname: true,
        fs: 'empty'
    }
}
