const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.client");

module.exports = merge(commonConfiguration, {
  mode: "production",
});
