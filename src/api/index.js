import Hjson from "hjson";

import HttpRequest from "@/utils/http";
import { isIE } from "@/utils/base";

const instanceMap = {
  // 基础服务
  base: null
};

// 注册实例
export const initAxiosInstance = config => {
  const { API, API_FILE_DIR } = config;
  const BASEURL = API + API_FILE_DIR || "";
  instanceMap.base = new HttpRequest({
    BASEURL
  });
};

/**
 * get方法
 * @param {String} url [请求的url地址]
 * @param {String} serviceName [请求服务名和服务描述(和swagger对应)]
 * @param {Object} options [请求时携带的参数] (可选)
 */
const get = (axiosInstance, url, serviceName = "未知服务", options = {}) =>
  new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: "get",
      // fix ie get 缓存问题
      headers: isIE
        ? {
            "Cache-Control": "no-cache"
          }
        : {},
      ...options
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
        console.error(`get请求---${serviceName}---接口失败`);
      });
  });

/**
 * post方法
 * @param {String} url [请求的url地址]
 * @param {String} serviceName [请求服务名和服务描述(和swagger对应)]
 * @param {Object} params [请求时携带的参数] (可选)
 */
const post = (
  axiosInstance,
  url,
  serviceName = "未知服务",
  params = {},
  options = {}
) =>
  new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: "post",
      data: params,
      ...options
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
        console.error(`post请求---${serviceName}---接口失败`);
      });
  });

/**
 * put方法
 * @param {String} url [请求的url地址]
 * @param {String} serviceName [请求服务名和服务描述(和swagger对应)]
 * @param {Object} params [请求时携带的参数] (可选)
 */
const put = (
  axiosInstance,
  url,
  serviceName = "未知服务",
  params = {},
  options = {}
) =>
  new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: "put",
      data: params,
      ...options
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
        console.error(`put请求---${serviceName}---接口失败`);
      });
  });

/**
 * delete方法
 * @param {String} url [请求的url地址]
 * @param {String} serviceName [请求服务名和服务描述(和swagger对应)]
 * @param {Object} params [请求时携带的参数] (可选)
 */
const Delete = (
  axiosInstance,
  url,
  serviceName = "未知服务",
  params = {},
  options = {}
) =>
  new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: "delete",
      data: params,
      ...options
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
        console.error(`请求---${serviceName}---接口失败`);
      });
  });

export const JGET = async (url, serviceName) => {
  try {
    const res = await HttpRequest.get(url, {
      // 阻止 axios 自动 JSON.parse
      // refer https://github.com/axios/axios/issues/907
      transformResponse: undefined,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });
    const { data } = res;
    return Hjson.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error(`请求---${serviceName}---失败`);
  }
};

export const GET = (url, serviceName, params, options) => {
  return get(instanceMap.base, url, serviceName, params, options);
};

export const POST = (url, serviceName, params, options) =>
  post(instanceMap.base, url, serviceName, params, options);

export const PUT = (url, serviceName, params, options) =>
  put(instanceMap.base, url, serviceName, params, options);

export const DELETE = (url, serviceName, params, options) =>
  Delete(instanceMap.base, url, serviceName, params, options);
