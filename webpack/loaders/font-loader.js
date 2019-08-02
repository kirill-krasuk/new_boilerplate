function getFontsLoader(isClient = true) {
    const fontsLoader = {
        test  : /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: [
            {
                loader : 'file',
                options: {
                    name      : '[name].[ext]',
                    outputPath: '../public/fonts',
                    publicPath: '/public/fonts',
                    emit      : !isClient
                }
            }
        ]
    };

    if (isClient) {
        fontsLoader.loader.unshift('cache?cacheDirectory=.cache/fonts-cache!thread');
    }

    return fontsLoader;
}

module.exports = { getFontsLoader };