import { Plugin } from 'webpack'

declare namespace HTMLMinifierPlugin {
  interface Options {
    verbose?: boolean
  }
}

export default class HTMLMinifierPlugin extends Plugin {
  constructor (minifierOptions?: object, options?: HTMLMinifierPlugin.Options)
}
