/*
 * @Author: 何元鹏
 * @LastEditors: 何元鹏
 * @Description: 缓存结果函数 [key(函数): value(该函数返回值)]
 * @Date: 2019-04-22 19:45:20
 * @LastEditTime: 2020-07-31 13:54:58
 */

export default fn => {
  const cacheMap = new Map();
  return () => {
    const hit = cacheMap.get(fn);
    if (!hit) {
      const data = fn();
      cacheMap.set(fn, data);
      return data;
    }
    return hit;
  };
};
