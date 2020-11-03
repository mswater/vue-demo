import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import authDirective from "./directives/authDirective";

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(authDirective);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
