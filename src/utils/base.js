/**
 * @description: 判断是否为ie浏览器
 * @returns {Boolean}
 */
export const isIE =
  window.navigator.userAgent.toLowerCase() &&
  /msie|trident/.test(window.navigator.userAgent.toLowerCase());

/**
 *  判断是否为开发环境
 *  @returns Boolean
 */
export const isDev = () => process.env.NODE_ENV === "development";
