/*
 * @Author: 何元鹏
 * @Date: 2020-05-29 12:50:54
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-07-23 11:08:26
 */

const CompressionPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = ["js", "css"];

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/" : "./",
  devServer: {
    open: true
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        prependData: `@import "@/styles/index.scss";`
      }
    }
  },
  transpileDependencies: ["view-design/src"],
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("CompressionPlugin").use(CompressionPlugin, [
        {
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        }
      ]);
    }
  }
};
