/*
 * @Author: 何元鹏
 * @Date: 2020-05-29 11:16:48
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-06-16 16:09:58
 */

import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules
});
