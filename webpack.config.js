const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: './src/index.html' 
        }),
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
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(?:js|mjs|cjs|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              // options: {
              //   presets: ['@babel/preset-env', "@babel/preset-react"],
              // }
            }
          }
        ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.jsx.html'],
      modules: [
        path.join(__dirname, 'node_modules'),
      ],
    },

    // optimization: {
    //     runtimeChunk: 'single',
    // },
};