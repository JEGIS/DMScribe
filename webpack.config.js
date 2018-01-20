var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');
//var IMG_DIR = path.join(__dirname, '/react-client/dist/images');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module : {
    rules : [
      {
        test : /\.js?/,
        exclude: /node_modules/,
        include : SRC_DIR,
        loader : 'babel-loader',
        options: {
          presets: ['react']
        }
      },
      {
        test: /\.scss$/,
        use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader",                
                options: {
                    includePaths: ["/Users/josephstrandmo/Desktop/Development/github.com/hackreactor/DMScribe/react-client/dist/images/walpaper2.jpg"]
                } // compiles Sass to CSS
            }]
      }
    ]
  }
};

          // 'style-loader',
          // 'css-loader',
          // 'sass-loader'