# HTMLMinifier Webpack Plugin

A Webpack plugin to minimize HTML files.

## What does the plugin do?

It will search for HTML files during the Webpack build and will minimize the HTML with [HTMLMinifier](https://www.npmjs.com/package/html-minifier).

## Configuration:

The plugin pass the configuration to HTMLMinifier, defaults to `{}`.

## Example:

``` javascript
var HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
module.exports = {
	module: {
		loaders: [
			{ test: /\.html$/, loaders: ['file-loader?name=[name].html', 'extract-loader', 'html-loader'] }
		]
	},
	plugins: [
        new HtmlMinifierPlugin({
            // HTMLMinifier options
        })
	]
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
