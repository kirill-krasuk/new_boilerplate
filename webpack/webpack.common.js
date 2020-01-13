const webpack = require('webpack');
const path    = require('path');

const CompressionPlugin              = require('compression-webpack-plugin');
const { InjectManifest }             = require('workbox-webpack-plugin');
const { CleanWebpackPlugin }         = require('clean-webpack-plugin');
const LoadablePlugin                 = require('@loadable/webpack-plugin');
const Dotenv                         = require('dotenv-webpack');
const MiniCssExtractPlugin           = require('mini-css-extract-plugin');
const HtmlPlugin                     = require('html-webpack-plugin');
const HtmlHardDiskPlugin             = require('html-webpack-harddisk-plugin');
const HtmlPugPlugin                  = require('html-webpack-pug-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const HardSourceWebpackPlugin        = require('hard-source-webpack-plugin');

const { getJsLoader }         = require('./loaders/js-loader');
const { getImageLoader }      = require('./loaders/image-loader');
const { getFontsLoader }      = require('./loaders/font-loader');
const { getCssLoader }        = require('./loaders/css-loader');
const { getSassLoader }       = require('./loaders/sass-loader');
const { getSassModuleLoader } = require('./loaders/sass-module-loader');
const { getSVGLoader }        = require('./loaders/svg-loader');

const paths = {
    src     : path.resolve('src'),
    dist    : path.resolve('dist'),
    entry   : path.resolve('src/core/index.jsx'),
    template: path.resolve('src/core/template/index.pug'),
    view    : path.resolve('views/index.pug')
};

const context = path.resolve(__dirname, '..',);

module.exports = {
    paths,
    configureBundler(options) {
        const isProd = options.mode === 'production';

        function addHash(template, hash) {
            return isProd
                ? template.replace(/\.[^.]+$/, `.[${ hash }]$&`)
                : template;
        }

        return {
            context,
            mode  : options.mode,
            entry : options.entry,
            output: {
                chunkFilename: addHash('[name].js', 'contenthash:8'),
                path         : `${ paths.dist }`,
                filename     : addHash('[name].js', 'contenthash:8'),
                publicPath   : '/dist/',
                pathinfo     : false,
            },
            devtool      : options.devtool || false,
            resolveLoader: {
                moduleExtensions: [ '-loader' ]
            },
            resolve: {
                extensions: [ '.js', '.jsx', '.css', '.sass', '.scss', '.json' ],
                alias     : {
                    'react-dom': isProd ? 'react-dom' : '@hot-loader/react-dom'
                }
            },
            optimization: {
                runtimeChunk: 'single',
                minimize    : options.minimize || false,
                minimizer   : options.minimizer,
                splitChunks : {
                    cacheGroups: {
                        reactVendor: {
                            test              : /(react|redux)/g,
                            name              : 'react-vendors',
                            chunks            : 'initial',
                            reuseExistingChunk: true,
                            priority          : 40
                        },
                        uiVendor: {
                            test              : /src\/ui\/components/g,
                            name              : 'ui-vendors',
                            chunks            : 'initial',
                            reuseExistingChunk: true,
                            priority          : 20
                        },
                        coreVendor: {
                            test              : /src\/core/g,
                            name              : 'core-vendors',
                            chunks            : 'initial',
                            reuseExistingChunk: true,
                            priority          : 30
                        },
                        vendors: {
                            test              : /[\\/]node_modules[\\/]/,
                            name              : 'vendors',
                            chunks            : 'initial',
                            reuseExistingChunk: true,
                            priority          : 30
                        }
                    }
                }
            },
            module: {
                rules: [
                    getJsLoader(),
                    getCssLoader(),
                    getSassLoader(),
                    getSassModuleLoader(),
                    getImageLoader(),
                    getFontsLoader(),
                    getSVGLoader()
                ]
            },
            watch  : options.watch || false,
            plugins: options.plugins.concat([
                new CompressionPlugin({
                    cache: '.cache/compression_plugin_cache',
                    test : /\.js(\?.*)?$/i,
                }),
                new InjectManifest({
                    swDest           : './sw.js',
                    importWorkboxFrom: 'cdn',
                    include          : /(\.js(\.gz)?$)/,
                    swSrc            : `./internals/sw-manifest.${ options.mode }.js`,
                }),
                new HtmlPlugin({
                    template         : paths.template,
                    filename         : paths.view,
                    alwaysWriteToDisk: true,
                    excludeAssets    : [ /\.(js|css)/ ]
                }),
                new HtmlWebpackExcludeAssetsPlugin(), // for exludeAssets
                new HtmlHardDiskPlugin(), // for alwaysWriteToDisk
                new HtmlPugPlugin(),
                new MiniCssExtractPlugin({
                    filename     : addHash('[name].css', 'contenthash:8'),
                    chunkFilename: addHash('[id].css', 'contenthash:8'),
                }),
                new Dotenv(),
                new LoadablePlugin(),
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(options.mode)
                    }
                }),
                new webpack.ContextReplacementPlugin(
                    /moment[/\\]locale$/,
                    /ru/
                ),
                new CleanWebpackPlugin({
                    cleanOnceBeforeBuildPatterns: [
                        '**/*',
                        '!server.js',
                        '!*.server.js'
                    ],
                    cleanAfterEveryBuildPatterns: [
                        '!*.server.js',
                        '*.hot-update.json',
                        'precache-manifest.*.js'
                    ],
                }),
                new HardSourceWebpackPlugin({
                    cacheDirectory: path.resolve(__dirname, '..', '.cache/hard_source_plugin/'),
                    configHash(webpackConfig) {
                        return require('node-object-hash')({ sort: false }).hash(webpackConfig);
                    },
                }),
                new HardSourceWebpackPlugin.ExcludeModulePlugin([
                    {
                        test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
                    },
                    {
                        test: /loadable\.js/
                    },
                    {
                        test: /src\/vendors/
                    }
                ]),
            ])
        };
    }
};
