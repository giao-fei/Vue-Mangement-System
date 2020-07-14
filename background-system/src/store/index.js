import Vue from "vue";
import Vuex from "vuex";

// 模块化分离
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import moduleA from "../store/modules/moduleA";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations,
  actions,
  getters,
  modules: {
    a: moduleA,
  },
});
