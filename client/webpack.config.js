const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

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
        template: path.resolve(__dirname,'Develop', 'client', 'index.html'), 
        filename: 'index.html', 
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'Text Editor',
        description: 'Just another text editor',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', 
        icons: [
          {
            src: path.resolve(__dirname, 'src', 'images', 'logo.png'), // Path to your app icon
            sizes: [96, 128, 192, 256, 384, 512] 
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'service-worker.js'
      })
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
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
