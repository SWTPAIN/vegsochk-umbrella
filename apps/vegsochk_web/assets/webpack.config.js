var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var webpack = require("webpack");
var env = process.env.MIX_ENV || "dev";
var isProduction = env === "prod";

// Create multiple instances
const extractHTMLCSS = new ExtractTextPlugin('css/app.css');
const extractComponentCss = new ExtractTextPlugin('css/app-component.css');

module.exports = {
  entry: {
    app: ["./js/app.js", "./css/app.scss"],
    "pages/authors-articles-new": ["./js/pages/authors/articles/new.js"],
    "pages/authors-articles-edit": ["./js/pages/authors/articles/edit.js"],
    animals: ["./js/pages/animals.js"],
    "vegan-tips": ["./js/pages/vegan-tips.js"]
  },
  output: {
    path: path.resolve(__dirname, "../priv/static/"),
    filename: "js/[name].js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: /css/,
        use: extractHTMLCSS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              // options: {
              //   modules: true
              // }
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: [path.resolve("node_modules/bootstrap/scss")],
                sourceComments: !isProduction
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        include: /js/,
        use: extractComponentCss.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            }
          ]
        })
      },      
      {
        test: /\.(js|jsx)$/,
        include: /(js|jsx)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./static" }]),
    extractHTMLCSS,
    extractComponentCss,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"]
    })
  ]
};
