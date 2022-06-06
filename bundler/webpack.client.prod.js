const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.client.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // clean dist before create files
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = merge(commonConfiguration, {
  mode: "production",
  plugins: [new CleanWebpackPlugin(), new CompressionPlugin()],
});
