/*
 * @Author: 何元鹏
 * @Date: 2020-05-29 12:50:54
 * @LastEditors: 何元鹏
 * @LastEditTime: 2022-02-16 15:06:33
 */

const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];

const Path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

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
  configureWebpack: {
     plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: Path.resolve('./node_modules/cesium/Source/Workers'), to: 'Workers' },
          { from: Path.resolve('./node_modules/cesium/Source/Assets'), to: 'Assets' },
          { from: Path.resolve('./node_modules/cesium/Source/Widgets'), to: 'Widgets' },
          { from: Path.resolve('./node_modules/cesium/Source/ThirdParty/Workers'), to: 'WoThirdParty/Workersrkers' },
        ]
      }),
      new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('./')
      })
      ],
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
