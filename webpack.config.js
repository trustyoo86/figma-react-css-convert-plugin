const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

const common = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: { chrome: '58' } }],
                ['@babel/preset-react', { runtime: 'automatic' }]
              ]
            }
          },
          'ts-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};

module.exports = [
  {
    ...common,
    target: 'node',
    entry: './src/code.ts',
    output: {
      filename: 'code.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/ui.html', to: 'ui.html' }]
      })
    ]
  },
  {
    ...common,
    target: 'web',
    entry: './src/ui/main.tsx',
    output: {
      filename: 'ui.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'ui.html',
        chunks: ['main'],
        template: 'src/ui.html',
        inject: 'body'
      }),
      new HtmlInlineScriptPlugin()
    ]
  }
];
