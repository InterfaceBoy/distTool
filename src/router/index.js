/*
 * @Author: 何元鹏
 * @Date: 2020-10-07 10:41:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-08-30 11:16:46
 */
import Vue from "vue";
import VueRouter from "vue-router";
import { isDev } from "@/utils/base";
import Layout from "@/layout/Layout.vue";
import Login from "@/views/login.vue";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/",
    name: "Login",
    meta: {
      title: "登录",
      icon: "logo-apple"
    },
    component: Login
  },
  {
    path: "/home",
    name: "homePage",
    meta: {
      title: "首页",
      icon: "md-easel"
    },
    component: () =>
      import(/* webpackChunkName: "MonitorWorning" */ "@/views/home-page.vue")
  },

  {
    path: "/map",
    component: Layout,
    redirect: "/openLayer",
    name: "Map",
    meta: {
      title: "地图模块",
      icon: "logo-xbox"
    },
    children: [
      {
        path: "/openLayer",
        name: "openLayer",
        meta: {
          title: "地图模块1",
          icon: "logo-xbox"
        },
        component: () =>
          import(
            /* webpackChunkName: "MonitorWorning" */ "@/views/openLayer/open-layer.vue"
          )
      },
      {
        path: "maps",
        name: "maps",
        meta: {
          title: "地图模块2",
          icon: "logo-xbox"
        },
        component: () =>
          import(
            /* webpackChunkName: "MonitorWorning" */ "@/views/openLayer/maps.vue"
          )
      }
    ]
  },

  {
    path: "/ECMAScript",
    component: Layout,
    redirect: "/grammar",
    name: "ECMAScript",
    meta: {
      title: "ES6语法",
      icon: "md-boat"
    },
    children: [
      {
        path: "/grammar",
        name: "grammar",
        meta: {
          title: "语法",
          icon: "md-boat"
        },
        component: () =>
          import(
            /* webpackChunkName: "MonitorWorning" */ "@/views/ECMAScript/grammar.vue"
          )
      }
    ]
  }
];

/* if (isDev()) {
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
} */

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

// fix vue-router 3.1 push 相同路由报错
// https://github.com/vuejs/vue-router/issues/2881
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default router;
