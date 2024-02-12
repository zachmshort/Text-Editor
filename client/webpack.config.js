const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'), 
        filename: 'index.html', 
      }),

      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'service-worker.js'
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', 
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve(__dirname, 'src', 'images', 'logo.png'), // Path to your app icon
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join('assets', 'icons'),
          }
        ]
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            }
          }
        }
      ],
    },
  };
};
