import { JGET } from "./index";

export function getAppConfig() {
  return JGET(`static/appConfig.hjson`, `获取系统配置文件`);
}
