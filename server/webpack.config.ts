const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();
const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw Error('NODE_ENV environmental variable not defined');
}

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  externals: [ nodeExternals() ],
  plugins: [ new NodemonPlugin() ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
        //    exclude: /node_modules/  // Unsure if I need this, nodeExternals() should already be doing this right?
      }
    ]
  },
  watch: NODE_ENV === 'development'
};
