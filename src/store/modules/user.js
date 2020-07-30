import { getUserInfo, logout } from "@/api/user";

const user = {
  namespaced: true,

  state: {
    addRoutes: [], // 权限路由表
    userInfo: {},
    userRegion: {},
    usercity: {}
  },

  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info;
    },
    setAddRoutes(state, routes) {
      state.addRoutes = routes;
    },
    resetAddRoutes(state) {
      state.addRoutes = [];
    },
    resetUserInfo(state) {
      state.userInfo = {};
    },
    setUserRegion(state, info) {
      state.userRegion = info;
    },
    setUsercity(state, info) {
      state.usercity = info;
    }
  },

  actions: {
    async getUserInfo({ commit }) {
      const data = await getUserInfo();
      commit("setUserInfo", data);
    }
    // async getUserRegion({ commit }) {
    //   const data = await getUserRegion();
    //   commit("setUserRegion", data);
    // },
    // async getUsercity({ commit }) {
    //   const data = await getUsercity();
    //   commit("setUsercity", data);
    // },
    // async userLogout({ commit }) {
    //   await logout();
    //   commit("resetAddRoutes");
    //   commit("resetUserInfo");
    //   resetRouter();
    // },
    // // 重置用户信息和权限路由表
    // resetUserInfoAndAddRoutes({ commit }) {
    //   commit("resetAddRoutes");
    //   commit("resetUserInfo");
    //   resetRouter();
    // }
  },

  getters: {
    userName: state => state.userInfo.userName,
    userRegionName: state => state.userRegion.regionName
  }
};

export default user;
