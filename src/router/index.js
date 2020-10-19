import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
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
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () => import("../views/Dashboard/Analysis")
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basic-form",
            component: () => import("../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "step-form",
            component: () => import("../views/Forms/StepForm/index"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: import("../views/Forms/StepForm/StepInfo")
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: import("../views/Forms/StepForm/Confirm")
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: import("../views/Forms/StepForm/Result")
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/practise",
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/SimpleLayout"),
    children: [
      {
        path: "circularQueue",
        name: "circularQueue",
        component: () =>
          import(
            /* webpackChunkName: "practice" */ "../views/Practice/CircularQueue"
          )
      }
    ]
  },
  {
    path: "/user",
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
    path: "*",
    name: "notfound",
    component: () => import("../views/NotFound")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
//
// router.beforeEach((to, from, next) => {
//   console.log(to.name);
//   console.log(from.name);
//   next();
// });
// router.afterEach((to, from) => {
//   console.log(to.fullPath);
//   console.log(from.params);
// })

export default router;
