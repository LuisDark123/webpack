// --------------------------------------------------------------------------------
// Dependencias de desarrollo -----------------------------------------------------
// --------------------------------------------------------------------------------

const path = require('path');
const autoprefixer = require('autoprefixer');
const ZipPlugin = require('zip-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminWebP = require('imagemin-webp');
const ImageminPlugin = require('imagemin-webpack-plugin').default;



// --------------------------------------------------------------------------------
// Configuración global -----------------------------------------------------------
// --------------------------------------------------------------------------------

const app = {

	
	entry: {   // Configuración del entry point
		'landstorm-cdn-javascript.js': [   // Nombre del archivo de salida
		  path.resolve(__dirname + '/dev/javascript/core.js'),   // Archivo JS unitario
          path.resolve(__dirname + '/dev/javascript/plyr.js'),
          path.resolve(__dirname + '/dev/javascript/blazy.js')
		]
	},

	
	output: {   // Configuración del output 
        filename: '[name]',
        path: path.resolve(__dirname + '/dist'),   // Carpeta de salida
    },
    
  devServer: {    // Configuración del servidor
      contentBase: path.join(__dirname + '/dist'),
      compress: true,
      port: 8080,   // Puerto
      host: 'Aquí tu IPv4',   // Dirección IPv4 del equipo
      open: true
  },

  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
  },


    module: {

    	rules: [
    	    
    	      {
      	      test: /\.pug$/,
              use: ['pug-loader']
            },

            {
              test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browser: ["last 2 versions"]
                            },
                            plugins: () => [
                                autoprefixer
                            ]
                        }
                    },
                    'sass-loader',
                ],
            },

            {
              test: /\.(woff(2)?|ttf|eot|svg)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts'
                  }
                }
              ]
            },

            {
              test: /\.(jpg|png)$/i,
              loaders: [
                'file-loader',
                'webp-loader'
              ]
            }
    	   ]
    },




    plugins: [

        // Depuracion del archivo en uso

        new MiniCssExtractPlugin({  // Extrae el css incrustado en el js
            filename: "landstorm-cdn-stylesheet.css"  // Nombre del archivo final css
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'dev/pug/index.pug',
            minify: {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: true
            }
        }),

    ]
}

module.exports = app;