/*
 * @Author: 何元鹏
 * @Date: 2020-07-31 11:03:21
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-06-16 16:29:15
 */
const app = {
  namespaced: true,
  state: {
    config: null, // 环境配置
    sysName: "",
    version: "",
    systemCode: "",
    routerInfo: []
  },

  mutations: {
    setConfig(state, data) {
      state.config = data;
    },
    setRouterInfo(state, data) {
      state.routerInfo = data;
    }
  },

  actions: {
    initConfig({ commit }, configInfo) {
      const { config } = configInfo;
      commit("setConfig", config);
    }
  },

  getters: {
    RouterInfo: state => {
      return state.routerInfo;
    }
  }
};

export default app;
