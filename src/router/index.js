import Vue from "vue";
import VueRouter from "vue-router";

import { isDev } from "@/utils/base";

import Layout from "@/layout/Layout.vue";
import HomePage from "@/views/home-page.vue";
Vue.use(VueRouter);

// fix vue-router 3.1 push 相同路由报错
// https://github.com/vuejs/vue-router/issues/2881
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export const constantRoutes = [
  {
    path: "/",
    name: "HomePage",
    meta: { title: '首页', icon: 'dashboard' },
    component: HomePage
  },
  {
    path: "/maps",
    name: "maps",
    meta: {
      navTitle: "地图实例",
      icon: "logo-xbox"
    },
    component: () =>
      import(
        /* webpackChunkName: "MonitorWorning" */ "@/views/openLayer/maps.vue"
      )
  },
  {
    path: "/openLayer",
    name: "openLayer",
    meta: {
      navTitle: "其他实例",
      icon: "logo-windows"
    },
    component: () =>
      import(
        /* webpackChunkName: "MonitorWorning" */ "@/views/openLayer/open-layer.vue"
      )
  }
];

if (isDev()) {
  constantRoutes.push(
    {
      path: "/comp",
      name: "comp",
      component: () => import("@/components/demo/index.vue")
    },
    {
      path: "/svg",
      name: "svg",
      component: () => import("@/views/svg-viewer.vue")
    }
  );
}

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
