import axios from "axios";
import Vue from "vue";

const http = axios.create({
  baseURL: "http://localhost:8081",
  timeout: 1000,
});
// 请求拦截
http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
  },
  (err) => {
    console.log(err);
  }
);
// 响应拦截
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        message: err.response.data.message,
        type: "error",
        center: true,
        duration: 800,
      });
    }
    return Promise.reject(err);
  }
);

export default http;
