/*
 * @Author: 何元鹏
 * @LastEditors: 何元鹏
 * @Description: 获取系统自定义配置信息
 * @LastEditTime: 2020-07-24 15:20:35
 */

import { getAppConfig } from "@/api/public";

import cachedFn from "./cached-fn";

export default cachedFn(async () => {
  try {
    const config = await getAppConfig();
    const env = process.env.NODE_ENV;

    return {
      config: config[env], // 根据环境过滤
      fullConfig: config
    };
  } catch (error) {
    console.log(error);
    return Promise.reject("无法读取配置文件的信息，请检测是否配置正确！");
  }
});
