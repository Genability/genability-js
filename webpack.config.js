const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  target: 'web',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { 
      'os': require.resolve('os-browserify/browser'), 
      'path': require.resolve('path-browserify'),
      'fs': false,
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'Genability',
      type: 'var',
    },
  },
};
