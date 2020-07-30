import { GET } from "./index";

export function getUserInfo() {
  return GET(`/rest/oms/private/user`, `获取用户信息`, {
    showErrorMessage: false
  });
}
