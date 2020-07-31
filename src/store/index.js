/*
 * @Author: 何元鹏
 * @Date: 2020-05-29 11:16:48
 * @LastEditors: 何元鹏
 * @LastEditTime: 2020-06-03 10:18:32
 */

import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  getters: {
    addRoutes: state => state.user?.addRoutes,
    userInfo: state => state.user?.userInfo,
    userRegion: state => state.user?.userRegion,
    usercity: state => state.user?.usercity,
    config: state => state.app?.config
  }
});
