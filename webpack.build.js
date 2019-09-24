const path = require('path');
const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminWebP = require('imagemin-webp');


const app = {

	plugins: [

        new CleanWebpackPlugin(), // Borra el directorio de salida

        new MiniCssExtractPlugin({  // Extrae el css incrustado en el js
            filename: "landstorm-cdn-stylesheet.css"  // Nombre del archivo final css
        }),

        new CopyWebpackPlugin([
          { from: 'dev/images/**', to: 'images/[name].[ext]' },
          { from: 'dev/images/**', to: 'images/[name].webp' },
          { from: 'dev/favicons/', to: 'favicons' }
        ]),

        new ImageminPlugin({
          pngquant: ({quality: 50}),
          plugins: [
            imageminMozjpeg({quality: 50}),
            ]
        }),

        // ----------------------------------------------------------------------------
        // Creación de archivos html --------------------------------------------------
        // ----------------------------------------------------------------------------

        // Critical CSS - index.html

        new HtmlCriticalWebpackPlugin({
          base: path.resolve(__dirname, 'dist'),
          src: 'index.html',
          dest: 'index.html',
          inline: true,
          minify: true,
          width: 375,
          height: 565,
          penthouse: {
            blockJSRequests: false,
          }
        }),

        // ----------------------------------------------------------------------------
        // ----------------------------------------------------------------------------

        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'dev/pug/index.pug',
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true,
        //         caseSensitive: true,
        //         removeComments: true,
        //         removeEmptyElements: true
        //     }
        // }),

        // new HtmlCriticalWebpackPlugin({
        //   base: path.resolve(__dirname, 'dist'),
        //   src: 'index.html',
        //   dest: 'index.html',
        //   inline: true,
        //   minify: true,
        //   width: 375,
        //   height: 565,
        //   penthouse: {
        //     blockJSRequests: false,
        //   }
        // }),

        // ----------------------------------------------------------------------------
        // ----------------------------------------------------------------------------


        // ----------------------------------------------------------------------------
        // Compression of all public archives in zip for cpanel -----------------------
        // ----------------------------------------------------------------------------

        new ZipPlugin({
          path: '../cpanel',
          filename: 'bundle.zip'
        })

	],
};

module.exports = merge(common, app)