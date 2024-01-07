const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var ZipPlugin = require('zip-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const suffix = devMode ? '' : 'min.';;
module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'index.'+suffix+'js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new HtmlWebpackPlugin({
        filename: 'aboutme.html',
        template: path.resolve(__dirname, 'src', 'aboutme.html'),
    }),
    new HtmlWebpackPlugin({
        filename: 'contact.html',
        template: path.resolve(__dirname, 'src', 'contact.html'),
    }),
    new HtmlWebpackPlugin({
        filename: 'job.html',
        template: path.resolve(__dirname, 'src', 'job.html'),
    }),
    new HtmlWebpackPlugin({
        filename: 'zvo.html',
        template: path.resolve(__dirname, 'src', 'zvo.html'),
    }),
    new ZipPlugin({
      path: 'zip',
      filename: 'result.zip',
      extension: 'zip',
      zipOptions: {
        forceZip64Format: false,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style.'+suffix+'css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: {
          and: [/node_modules/],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "ie 11" }]
            ]
          }
        }
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          'group-css-media-queries-loader',
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: devMode
          ? []
          : [
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  webp: {
                    quality: 75,
                  },
                },
              },
            ],
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
