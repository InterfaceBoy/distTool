/*
 * @Author: raojw
 * @Date: 2019-11-25 17:00:08
 * @LastEditors: raojw
 * @LastEditTime: 2020-05-29 10:56:52
 * @Description: axios 二次封装
 */

import axios from "axios";
import iview from "view-design";

export default class HttpRequest {
  constructor({ BASEURL, TIMEOUT = 60000 * 3, errorHook = () => {} }) {
    this.config = {
      baseURL: BASEURL,
      timeout: TIMEOUT,
      withCredentials: true
    };
    this.instance = axios.create(this.config);
    // 请求错误钩子，可以在外面注册错误回调处理
    this.errorHook = errorHook;
    // 安装拦截器
    this.interceptors();
    return this.instance;
  }
  // 拦截器
  interceptors(instance = this.instance) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        // 请求失败
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      response => {
        const { status, config } = response;
        let { showErrorMessage } = config;
        // showErrorMessage 不传，默认展示错误信息
        if (showErrorMessage === undefined) {
          showErrorMessage = true;
        }
        if (status === 200) {
          const { data } = response;
          const { code, message, error } = data; // error 兼容soe
          if (code !== 1000) {
            if (message !== "未登录或登录失效，请重新登录") {
              showErrorMessage &&
                iview.Message.error({
                  content: `${message}`,
                  duration: 6
                });
            }
            this.errorHook(response);
            return Promise.reject(message);
          }
          if (error) {
            showErrorMessage &&
              iview.Message.error(`${error.code} ${error.message}`);
            this.errorHook(response);
            return Promise.reject(error.message);
          }
          return Promise.resolve(data);
        } else {
          this.errorHook(response);
          return showErrorMessage && iview.Message.error(status);
        }
      },
      error => {
        this.errorHook(error.response);
        iview.Message.error(error.message);
        return Promise.reject(error.response);
      }
    );
  }
  static get(...args) {
    return axios.get(...args);
  }
}
