const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');

const extractSass = new ExtractTextPlugin({
    filename: "css/style.css"
});
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

const config = {
    entry: [
        'babel-polyfill',
        './main.js'
    ],
    output: {
        path: __dirname+'/build',
        filename: 'js/bundle.js',
        publicPath: "/",
    },
    devtool: 'source-map',
    devServer: {
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1" },
        inline: true,
        port: 2993,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react', 'stage-2']
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract([{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }])
            },
            {
                test: /\.css/,
                use: extractSass.extract([{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }])
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                    }
                }
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     headers: {
        //         "Access-Control-Allow-Origin": "http://localhost:3000",
        //         "Access-Control-Allow-Credentials": "true",
        //         "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
        //         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        //     },
        //     debug: true
        // }),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin(envKeys),
        extractSass
    ]

};

module.exports = config;
