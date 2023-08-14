const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinizerPlugin = require('image-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');

const modeEnv = process.env.NODE_ENV === "production" ? "production" : "development";
const isProduction = modeEnv === "production";

module.exports = {
    mode: modeEnv,
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: './src/index.html' 
        }),
        new CssMinimizerPlugin(),
        new MiniCssExtractPlugin(),
        new Dotenv(),
    ],

    devServer: {
        static: './dist',
        https: false,
        historyApiFallback: true,
    },

    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : "style-loader", 
              "css-loader"
            , ],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(?:js|mjs|cjs|jsx)$/,
            enforce: "pre",
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            }
          },
          {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
          }
        ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.jsx.html'],
      modules: [
        path.join(__dirname, 'node_modules'),
      ],
    },

    optimization: {
        nodeEnv: "production",
        splitChunks: {
          chunks: 'all',
          minSize: 10,
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        },
        minimize: true,
        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            terserOptions: {
              // 移除 comments
              format: {
                comments: false,
              }
            }
          }),
          new CssMinimizerPlugin({
            test: /\.css(\?.*)?$/i,
            minimizerOptions: {
              preset: [
                "default",
                {
                  // 移除 comments
                  discardComments: {removeAll: true},
                }
              ]
            }
          }),
          new ImageMinizerPlugin({
            minimizer: {
              implementation: ImageMinizerPlugin.imageminMinify,
              options: {
                plugins: ["svgo"]
              }
            }
          }),
          new webpack.IgnorePlugin({
            resourceRegExp: /\/node_modules\/jest|\/__tests__\//,
          }),
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 10
          }),
          new BundleAnalyzerPlugin(),
        ],
    },

    performance: {
      hints: 'warning',
    },
};