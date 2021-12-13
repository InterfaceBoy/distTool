/*
 * @Author: 何元鹏
 * @Date: 2020-05-29 10:42:53
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-12-13 15:17:53
 */

import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import iView from "view-design";
import "view-design/dist/styles/iview.css";

import VueEventBus from "vue-plugin-event-bus";

// 安装 svg icon
import "@/svg";

// 安装全局组件
import "@/components/index";

Vue.use(iView);

Vue.use(VueEventBus);

Vue.config.productionTip = false;

// 初始化配置文件
import initConfig from "./initAppConfig.js";

// 全局css
import "./styles/global.scss";
// 引入tailWindCss
import "tailwindcss/tailwind.css";

function renderPage() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}

async function init() {
  await initConfig();
  renderPage();
}

init();
