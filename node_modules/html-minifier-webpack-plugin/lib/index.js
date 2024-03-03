const sources = require('webpack-sources')
const minifier = require('html-minifier').minify

class HTMLMinifierWebpackPlugin {
  constructor (minifierOptions = {}, options = {}) {
    this.minifierOptions = minifierOptions
    this.options = options
  }

  apply (compiler) {
    compiler.hooks.emit.tap('HTMLMinifierPlugin', compilation => {
      if (this.options.verbose) {
        console.log('Starting to optimize HTML...')
      }

      const assets = compilation.assets

      for (let name of Object.getOwnPropertyNames(assets)) {
        if (!name.match(/\.html$/)) {
          continue
        }

        if (this.options.verbose) {
          console.log('Processing ' + name + '...')
        }

        let asset = assets[name]
        let source = asset.source().toString()
        let result = minifier(source, this.minifierOptions)
        assets[name] = new sources.RawSource(result)
        if (this.options.verbose) {
          console.log('Processed ' + name +
            ', before: ' + source.length +
            ', after: ' + result.length +
            ', ratio: ' + Math.round(((result.length * 100) / source.length) * 100) / 100 + '%')
        }
      }
    })
  }
}

module.exports = HTMLMinifierWebpackPlugin
