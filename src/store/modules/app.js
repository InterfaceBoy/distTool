const app = {
  namespaced: true,

  state: {
    config: null, // 环境配置
    sysName: "",
    version: "",
    systemCode: ""
  },

  mutations: {
    setConfig(state, data) {
      state.config = data;
    }
  },

  actions: {
    initConfig({ commit }, configInfo) {
      const { config } = configInfo;
      commit("setConfig", config);
    }
  }
};

export default app;
