/*
 * @Author: 何元鹏
 * @Date: 2018-12-26 09:34:04
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-07-24 15:20:42
 */

import store from "@/store";
import getConfig from "@/utils/get-config";

import { initAxiosInstance } from "@/api";

export default async () => {
  const appConfig = await getConfig();
  const { config, fullConfig } = appConfig;

  const { SYSNAME } = fullConfig;
  // vuex 挂载
  store.commit("app/setConfig", Object.freeze(config));

  document.title = SYSNAME;

  // 注册 axios 实例
  initAxiosInstance(config);
};
