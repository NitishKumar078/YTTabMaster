const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

module.exports = merge(config, {
  target: "web",
  mode: "development",
  devtool: "inline-source-map",
});
