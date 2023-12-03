const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const webpack = require('webpack')

const fs = require('fs');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    console.log("Development: " + isDevelopment);

    return {
        devtool: isDevelopment ? "eval" : "source-map",
        entry: './src/App.jsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
            publicPath: '/',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },
                {
                    test: /\.(css|scss)$/,
                    exclude: /node_modules/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                }
                /**
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                outputPath: path.resolve('dist', 'images')
                            },
                        },
                    ]
                },
                */
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass', '']
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.isDev": isDevelopment
            }),
            new CleanWebpackPlugin(), // Clean builds not in use
            new MiniCssExtractPlugin({
                filename: isDevelopment ? 'main.css' : 'main.[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                title: "SkyBin"
            })
        ],
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
            minimizer: [new TerserPlugin()],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 5050,
            proxy: {
                '/api': {
                    target: 'http://localhost:8080', // The URL of the external API server
                    changeOrigin: true,
                }
            }
        }
    }
}
