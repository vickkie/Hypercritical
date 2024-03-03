import test from 'ava'
import webpack from 'webpack'
import rimraf from 'rimraf'
import HtmlMinifierWebpackPlugin from '../'
import fs from 'fs'

const webpackConfig = {
  target: 'web',
  mode: 'production',
  entry: {
    test: [
      './test/fixtures/index.html'
    ]
  },
  output: {
    path: __dirname + '/tmp',
    filename: 'js/[name].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: __dirname,
              name: '[name].html'
            }
          },
          {
            loader: 'extract-loader',
            options: {
              publicPath: './'
            }
          },
          'html-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlMinifierWebpackPlugin({
      collapseWhitespace: true
    })
  ]
}

test.afterEach.always('clear tmp', t => {
  rimraf.sync('test/tmp')
})

test.serial.cb('it minimises html files', t => {
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      t.fail(err || stats.compilation.errors)
    }
    t.is(fs.readFileSync(`test/tmp/index.html`, 'utf8').indexOf('\n'), -1)
    t.end()
  })
})
