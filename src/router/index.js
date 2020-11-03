import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { findLast } from "lodash";
import { check, isLogin } from "../utils/auth";
import { notification } from "ant-design-vue";

Vue.use(VueRouter);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    path: "/",
    meta: { icon: "folder", authority: ["admin", "user"] },
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "概览" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard",
            redirect: "/dashboard/analysis"
          },
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析" },
            component: () => import("../views/Dashboard/Analysis")
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form",
            redirect: "/form/basic-form"
          },
          {
            path: "/form/basic-form",
            name: "basic-form",
            meta: { title: "基础表单" },
            component: () => import("../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "step-form",
            meta: { title: "分步表单" },
            hideChildrenInMenu: true,
            component: () => import("../views/Forms/StepForm/index"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => import("../views/Forms/StepForm/StepInfo")
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => import("../views/Forms/StepForm/Confirm")
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => import("../views/Forms/StepForm/Result")
              }
            ]
          }
        ]
      },
      {
        path: "/practice",
        name: "practice",
        meta: { icon: "container", title: "练习" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/practice",
            redirect: "/practice/circular-queue"
          },
          {
            path: "/practice/circular-queue",
            name: "circular-queue",
            meta: { title: "环形队列" },
            component: () =>
              import(
                /* webpackChunkName: "practice" */ "../views/Practice/CircularQueue"
              )
          },
          {
            path: "/practice/transition-test",
            name: "transition-test",
            meta: { title: "动画切换测试" },
            component: () =>
              import(
                /* webpackChunkName: "practice" */ "../views/Practice/TransitionTest"
              )
          }
        ]
      },
      {
        path: "/about",
        name: "about",
        meta: { icon: "contacts", title: "关于我们" },
        component: () =>
          import(/* webpackChunkName: "practice" */ "../views/About")
      }
    ]
  },
  {
    path: "/plugins",
    name: "plugins",
    meta: { icon: "profile", title: "插件库" },
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/plugins",
        redirect: "/plugins/toast"
      },
      {
        path: "/plugins/toast",
        name: "toast",
        meta: { icon: "profile", title: "toast" },
        component: () =>
          import(/* webpackChunkName: "plugins" */ "../views/Plugins/Toast")
      }
    ]
  },
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register")
      }
    ]
  },
  {
    path: "/403",
    name: "forbidden",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "missed" */ "../views/Forbidden")
  },
  {
    path: "*",
    name: "missed",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "missed" */ "../views/NotFound")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(to.name);
  // console.log(from.name);
  if (to.path != from.path) {
    NProgress.start();
  }
  let record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "user/login") {
      next({ path: "/user/login" });
    } else if (to.path !== "/403") {
      notification.error({
        message: "forbidden",
        description: "没有权限，请联系管理员！"
      });
      next({ path: "/403" });
    }
    NProgress.done();
  }
  next();
});
router.afterEach(() => {
  // console.log(to.fullPath);
  // console.log(from.params);
  NProgress.done();
});

export default router;
