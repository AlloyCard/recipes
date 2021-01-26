const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const OUT_DIR = path.resolve(__dirname, 'dist');

const config = {
    entry: {
        app: path.resolve(SRC_DIR, 'app.js')
    },
    resolve: {
        extensions: ['.mjs', '.js', '.json', '.jsx', '.css'],  
    },
    // aws-sdk is already available in the Node.js Lambda environment
    //  so it can be excluded from function bundles
    externals: [
        'aws-sdk'       
    ],    
    output: {
        path: OUT_DIR,
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd'
    },
    target: 'node',
    mode: 'production',    
    module: {
        rules: [
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false // disable the behaviour
            }
          }
        ]
      }
};

module.exports = config;

            