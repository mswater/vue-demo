import Toast from "./Toast";

export default {
  install: Vue => {
    Vue.extend(Toast);
    Vue.prototype.$toast = function(msg) {
      console.log(msg);
    };
  }
};
