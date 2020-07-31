/*
 * @Author: 何元鹏
 * @Date: 2020-06-03 10:35:05
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-06-03 10:36:08
 * @Description: 自动注册全局组件
 */

import Vue from "vue";

// 检索目录下的模块
const req = require.context(".", true, /\.vue$/);

req.keys().forEach(fileName => {
  // 过滤demo文件夹下的组件
  if (/^\.\/demo\//.test(fileName)) {
    return;
  }

  const componentConfig = req(fileName);
  const name =
    fileName.name || fileName.replace(/^\.\/(.*\/)?/, "").replace(/\.vue$/, "");

  Vue.component(name, componentConfig.default || componentConfig);
});
