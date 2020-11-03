import { check } from "../utils/auth";

export default {
  install(Vue, options = []) {
    Vue.directive(options.name || "auth", {
      inserted(el, binding) {
        if (!check(binding.value)) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      }
    });
  }
};
