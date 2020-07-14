import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入全局css样式
import "./common-package/css/global.css";
// 导入阿里字库
import "./assets/font/iconfont.js";
import "./assets/font/iconfont.css";
// 导入axios
import http from "./http";
Vue.prototype.$http = http;

// 导入flexible 适配移动端
import "lib-flexible/flexible.js";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
