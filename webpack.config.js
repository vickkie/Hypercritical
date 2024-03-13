const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  entry: {
    main: "./js/main/index.js",
    contact: "./js/main/contact.js", // contact js
    services: "./js/main/services.js", // contact js
    works: "./js/main/works.js", // works js
    404: "./js/main/404.jsx",
    projectSlider: "./App.jsx",
  },
  output: {
    filename: "[name].bundle.js", // This will output {file}.bundle.js
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/, //  match both .js and .jsx files for react element
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"], // Add this line
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin(), new HtmlMinimizerPlugin()],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "includes", to: "includes" },
        { from: "hypercritical-worker.js", to: "hypercritical-worker.js" },
        { from: "offline.html", to: "offline.html" },
        { from: "css", to: "css" },
        { from: "server.js", to: "server.js" },
        { from: ".babelrc", to: ".babelrc" },
        { from: ".babel.config.json", to: ".babel.config.json" },
        { from: "tsconfig.json", to: "tsconfig.json" },
        { from: "fonts", to: "fonts" },
        { from: "js", to: "js" },
        { from: "assets", to: "assets" },
        { from: "README.md", to: "README.md" },
      ],
    }),
    ,
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body",
      chunks: ["main"], // main js  chunks included in the HTML
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./contact.html",
      filename: "contact.html",
      inject: "body",
      chunks: ["contact"], // contact chunk to include in the HTML
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./services.html",
      filename: "services.html",
      inject: "body",
      chunks: ["services"], // Service chunk to include in the HTML
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./works.html",
      filename: "works.html",
      inject: "body",
      chunks: ["works", , "projectSlider"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),

    new HtmlWebpackPlugin({
      template: "./404.html",
      filename: "404.html",
      inject: "body",
      chunks: ["404"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),

    new Dotenv(),
    new HtmlMinimizerPlugin(),
    new CleanWebpackPlugin(),
  ],
  devtool: false,
};
