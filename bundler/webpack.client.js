const path = require("path");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // clean dist before create files
const CopyWebpackPlugin = require("copy-webpack-plugin"); // copy files/folder into another
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // optimise css extract
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // optimise Image
const TerserPlugin = require("terser-webpack-plugin"); // minimize JS

const dirSrc = path.join(__dirname, "../src");
const dirStatic = path.join(__dirname, "../static");
const dirStyles = path.join(__dirname, "../src/styles");
const dirNode = "node_modules";

const IS_DEVELOPMENT = process.env.NODE_ENV === "dev";

module.exports = {
  mode: "developpement",
  entry: [path.join(dirSrc, "index.js"), path.join(dirStyles, "styles.scss")],
  output: {
    path: path.resolve(__dirname, "../dist/public"),
    filename: "[name].js",
  },
  performance: {
    hints: false,
  },
  resolve: {
    // find element in import from folder like modules etc..
    modules: [dirSrc, dirStatic, dirStyles, dirNode],
  },

  plugins: [
    new CleanWebpackPlugin(),
    // define global variables like JQUERY => $
    new webpack.DefinePlugin({
      IS_DEVELOPMENT,
    }),

    // copy all file into another
    new CopyWebpackPlugin({
      patterns: [{ from: dirStatic, to: "static" }],
    }),
    // optimise css extract
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

  module: {
    rules: [
      // compile new js functionnality and transform it to easy js for the browser
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      // file loader
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp|mp3|wav|mp4)$/,
        loader: "file-loader",
        options: {
          name(file) {
            return "[hash].[ext]";
          },
        },
      },
      // image optimisation
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        use: [
          {
            loader: ImageMinimizerPlugin.loader, // NEED CONFIG https://www.npmjs.com/package/image-minimizer-webpack-plugin
          },
        ],
      },
      // SHADER FILE LOADERS
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "raw-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "glslify-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
