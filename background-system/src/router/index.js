import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    component: () => import("../views/register.vue"),
    meta: {
      title: "注册",
    },
  },
  {
    path: "/primary",
    name: "primary",
    component: () => import("../views/primary.vue"),
    meta: {
      title: "后台管理系统",
      requireAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "user_table",
      },
      {
        path: "user_table",
        component: () => import("../views/primary/user_table.vue"),
        meta: {
          title: "用户列表",
          requireAuth: true,
        },
      },
      {
        path: "admin_table",
        component: () => import("../views/primary/admin_table.vue"),
        meta: {
          title: "管理员列表",
          requireAuth: true,
        },
      },
      {
        path: "user_authority",
        component: () => import("../views/primary/user_authority.vue"),
        meta: {
          title: "用户权限",
          requireAuth: true,
        },
      },
      {
        path: "product_list",
        component: () => import("../views/primary/product_list.vue"),
        meta: {
          title: "商品列表",
          requireAuth: true,
        },
      },
      {
        path: "user_statistics",
        component: () => import("../views/primary/user_statistics.vue"),
        meta: {
          title: "用户统计",
          requireAuth: true,
        },
      },
      {
        path: "orders_received_statistics",
        component: () =>
          import("../views/primary/orders_received_statistics.vue"),
        meta: {
          title: "订单统计",
          requireAuth: true,
        },
      },
      {
        path: "my_setting/update_myself",
        component: () => import("../views/primary/update_myself.vue"),
        meta: {
          title: "修改我的资料",
          requireAuth: true,
        },
      },
      {
        path: "my_setting/close_account",
        component: () => import("../views/primary/close_account.vue"),
        meta: {
          title: "注销账号",
          requireAuth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 路由全局守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (window.sessionStorage.getItem("token") == "true") {
      // 判断本地是否存在token
      next();
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: "/login",
      });
    }
  } else {
    if (window.sessionStorage.getItem("token") == "true") {
      next("/primary");
    } else {
      next();
    }
  }
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
