
let path = require('path');
let webpack = require('webpack');
let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

let plugins = [
    new webpack.DefinePlugin({
        'TYPE': JSON.stringify('splitChunks')
    })
];

if (process.env.ANALYZE) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: 8889
        })
    )
}

module.exports = {
    mode: 'development',
    entry: {
        entry: path.resolve('../../src1/entry.js'),
        entry2: path.resolve('../../src2/entry2'),
        entry3: path.resolve('../../src2/entry3')
    },
    output: {
        filename: '[name].js',
        jsonpFunction: 'splitChunk'
    },
    optimization: process.env.CHUNK ? {
        runtimeChunk: {
            name: 'entry'
        },
        minimize: false,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                entry: {
                    chunks: 'all',
                    name: 'entry',
                    enforce: true,
                    test: function(module) {
                        return (
                            module.context && module.context.startsWith(path.resolve('../../src1'))
                        );
                    }
                }
            }
        }
    } : {},
    plugins
};