const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const partytown = require("@builder.io/partytown/utils");
const UpdateDeploymentDatePlugin = require("./js/main/updateDeployment");

// Check if the build is for production
const isProduction = process.env.NODE_ENV === "production";

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: "includes",
        to: "includes",
      },
      { from: "hypercritical-worker.js", to: "hypercritical-worker.js" },
      { from: "offline.html", to: "offline.html" },
      { from: "css", to: "css" },
      { from: "fonts", to: "fonts" },
      { from: "js/library", to: "js/library" },
      { from: "assets", to: "assets" },
      {
        from: partytown.libDirPath(),
        to: path.join(__dirname, "public", "~partytown"),
      },
    ],
  }),
  new HtmlWebpackPlugin({
    template: "./index.html",
    filename: "index.html",
    inject: "body",
    chunks: ["main", "menu"], // main js  chunks included in the HTML
    minify: {
      collapseWhitespace: true,
      removeComments: false,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    },
  }),
  new HtmlWebpackPlugin({
    template: "./contact.html",
    filename: "contact.html",
    inject: "body",
    chunks: ["contact", "menu"], // contact chunk to include in the HTML
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
    chunks: ["services", "menu"], // Service chunk to include in the HTML
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
    chunks: ["works", "projectSlider", "menu"],
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
  new HtmlWebpackPlugin({
    template: "./studio.html",
    filename: "studio.html",
    inject: "body",
    chunks: ["studio", "partnerModal", "menu"],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    },
  }),
  new HtmlWebpackPlugin({
    template: "./terms.html",
    filename: "terms.html",
    inject: "body",
    chunks: ["terms", "menu"],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    },
  }),
  new HtmlWebpackPlugin({
    template: "./privacy.html",
    filename: "privacy.html",
    inject: "body",
    chunks: ["privacy", "menu"],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    },
  }),
  new HtmlWebpackPlugin({
    template: "./process.html",
    filename: "process.html",
    inject: "body",
    chunks: ["process", "menu"],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    },
  }),
  new HtmlWebpackPlugin({
    template: "./project.html",
    filename: "project.html",
    inject: "body",
    chunks: ["projectReact", "projectVanilla", "menu"],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    },
  }),
  new HtmlWebpackPlugin({
    template: "./login.html",
    filename: "login.html",
    inject: "body",
    chunks: ["loginpage", "login", "menu"],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    },
  }),
  new Dotenv({
    allowEmptyValues: true,
    systemvars: true,
  }),
  new HtmlMinimizerPlugin(),
  new CleanWebpackPlugin(),
  new UpdateDeploymentDatePlugin(),
];

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    main: "./js/main/index.js",
    contact: "./js/main/contact.js",
    services: "./js/main/services.js",
    works: "./js/main/works.js",
    studio: "./js/main/studio.js",
    terms: "./js/main/terms.js",
    privacy: "./js/main/privacy.js",
    menu: "./js/main/MultiMenu.jsx",
    process: "./js/main/process.js",
    404: "./js/main/404.jsx",
    projectSlider: "./js/main/workSlider.jsx",
    partnerModal: "./js/main/modal.jsx",
    loginpage: "./js/main/components/LoginApp.jsx",
    login: "./js/main/login.js",
    projectReact: "./js/main/projects/ProjectPage.jsx",
    projectVanilla: "./js/main/projects/project.js",
  },
  output: {
    filename: "[name].bundle.js", // outputs {file}.bundle.js
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/, //  match both .js and .jsx files for react Component
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin(), new HtmlMinimizerPlugin()],
  },

  plugins: plugins,
  devtool: false,
};
