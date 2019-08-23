
let path = require('path');
let webpack = require('webpack');
let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

let plugins = [
    new webpack.DefinePlugin({
        'TYPE': JSON.stringify('commonsChunk')
    })
];

if (process.env.CHUNK) {
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'entry',
            minChunks: function(module) {
                return (
                    module.context && module.context.startsWith(path.resolve('../../src1'))
                );
            }
        })
    );
}

if (process.env.ANALYZE) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: 8888
        })
    )
}

module.exports = {
    entry: {
        entry: '../../src1/entry',
        entry2: '../../src2/entry2',
        entry3: '../../src2/entry3'
    },
    output: {
        filename: 'dist/[name].js',
        jsonpFunction: 'commonsChunk'
    },
    plugins
};