/*
 * @Autor: 何元鹏
 * @Date: 2019-12-03 15:47:06
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-07-31 11:15:34
 */
"use strict";

module.exports = {
  types: [
    { value: "feat", name: "feat:     新功能" },
    { value: "fix", name: "fix:      修复" },
    { value: "code", name: "code:      代码优化或修正" },
    { value: "docs", name: "docs:     文档变更" },
    { value: "style", name: "style:    代码格式(不影响代码运行的变动)" },
    {
      value: "refactor",
      name: "refactor: 重构(既不是增加feature，也不是修复bug)，即代码优化",
    },
    { value: "perf", name: "perf:     性能优化" },
    { value: "test", name: "test:     增加测试" },
    { value: "chore", name: "chore:    构建过程或辅助工具的变动" },
    { value: "revert", name: "revert:   回退" },
    { value: "build", name: "build:    打包" },
    {
      value: "version",
      name: "version: 发版本用的",
    },
    {
      value: "icon",
      name: "icon: 更新 icon",
    },
  ],

  scopes: ["公共模块", "cli", "版本更新"],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
};
