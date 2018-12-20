const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const basePath = __dirname;

module.exports = {
    entry: {
        js: './src/index.js',
        vanilla: './src/hello_vanilla.js',
        typescript: './src/hello_ts.js',
        todo: './src/to_do.js'
    },
    output: {
        filename: '[name].[chunkhash].js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader, 
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap:true }},
                    { loader: 'resolve-url-loader', options: {root:__dirname}},
                    { 
                        loader: 'sass-loader', 
                        options: { 
                            outputStyle: 'compressed', 
                            sourceMap: true, 
                            sourceMapContents: false
                        }
                    },
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    'file-loader?name=assets/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug'
                ]
            },
            {
                test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
                use: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {loader: 'ts-loader'}
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/**/*.*']),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            hash: true,
            chunks: ['js']
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './hello-vanilla.html',
            hash: true,
            chunks: ['vanilla']
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './hello-ts.html',
            hash: true,
            chunks: ['typescript']
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './to-do.html',
            hash: true,
            chunks: ['todo']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        
    ],
}