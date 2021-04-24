const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment? 'development': 'production',
  devtool: isDevelopment? 'eval-source-map':'source-map',
  entry: path.resolve(__dirname, 'src', 'main.ts'),
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true,
        }
      },
      {
        test: /\.(j|t)s/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader'},
          { 
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    })
  ]
}