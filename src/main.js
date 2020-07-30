/*
 * @Author: raojw
 * @Date: 2020-05-29 10:42:53
 * @LastEditors: raojw
 * @LastEditTime: 2020-06-16 09:52:50
 */

// babel polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import iview from "view-design";
import "view-design/dist/styles/iview.css";

import VueEventBus from "vue-plugin-event-bus";

// 安装 svg icon
import "@/svg";

// 安装全局组件
import "@/components/index";

Vue.use(iview);

Vue.use(VueEventBus);

Vue.config.productionTip = false;

// 初始化配置文件
import initConfig from "./initAppConfig.js";

// 全局css
import "./styles/global.scss";

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
