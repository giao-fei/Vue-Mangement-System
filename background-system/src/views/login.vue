<template>
  <div class="login_contain">
    <div class="login_box">
      <h2 style="text-align: center;  color: black; ">电商后台管理系统</h2>
      <el-form class="form">
        <el-form-item class="form_item">
          <el-input
            v-model="text"
            placeholder="请输入账号"
            class="input"
            prefix-icon="el-icon-user-solid"
            maxlength="18"
          ></el-input>
          <!-- 叉叉图标 -->
          <span class="iconfont icon-qingchu" v-show="del" @click="clean"></span>
        </el-form-item>
        <el-form-item class="form_item">
          <el-input
            type="text"
            v-model="password"
            v-if="pwd"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            maxlength="10"
            @keyup.enter.native="login"
          ></el-input>
          <el-input
            v-model="password"
            v-else
            type="password"
            placeholder="请输入密码"
            class="input"
            prefix-icon="el-icon-lock"
            maxlength="10"
            @keyup.enter.native="login"
          ></el-input>
          <!-- 眼睛图标 -->
          <span
            class="iconfont icon-biyan"
            style="font-size: 15px; top: 6%;"
            @click="eye"
            v-show="isShow"
          ></span>
          <span
            class="iconfont icon-yanjing-zhengyan"
            style="font-size: 15px; top: 6%;"
            @click="eye"
            v-show="Change"
          ></span>
        </el-form-item>
        <!-- 登录和注册按钮 -->
        <el-form-item class="form_item">
          <el-button
            type="primary"
            class="btn"
            @click="login"
            v-loading.fullscreen.lock="fullscreenLoading"
          >登录</el-button>
        </el-form-item>
        <el-form-item class="form_item">
          <el-button
            type="primary"
            class="btn"
            @click="register"
            v-loading.fullscreen.lock="fullscreenLoading"
          >注册</el-button>
        </el-form-item>
        <!-- 图标高亮 -->
        <el-form-item class="form_item">
          <span style="font-size: 13px; position: absolute; color: black;">
            <b>社交帐号登录</b>
          </span>
          <svg
            class="icon"
            @mouseover="MouseOver(0)"
            @mouseout="MouseLeave(0)"
            :class="TabIndex==0?'active':''"
          >
            <use xlink:href="#icon-weibo" />
          </svg>
          <svg
            class="icon"
            @mouseover="MouseOver(1)"
            @mouseout="MouseLeave(1)"
            :class="TabIndex==1?'active':''"
          >
            <use xlink:href="#icon-github" />
          </svg>
          <svg
            class="icon"
            @mouseover="MouseOver(2)"
            @mouseout="MouseLeave(2)"
            :class="TabIndex==2?'active':''"
          >
            <use xlink:href="#icon-QQ1" />
          </svg>
          <svg
            class="icon"
            @mouseover="MouseOver(3)"
            @mouseout="MouseLeave(3)"
            :class="TabIndex==3?'active':''"
          >
            <use xlink:href="#icon-weixin" />
          </svg>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      text: "",
      password: "",
      pwd: false,
      // 图标高亮
      TabIndex: -1,
      // 密码框眼睛隐藏与显示
      isShow: true,
      Change: false,
      del: true,
      fullscreenLoading: false
    };
  },
  methods: {
    register() {
      this.$router.replace({
        path: "/register"
      });
    },
    // 图片高亮
    MouseOver(index) {
      this.TabIndex = index;
    },
    MouseLeave() {
      this.TabIndex = -1;
    },
    // 一键清除
    clean() {
      this.text = "";
    },
    // 睁眼闭眼切换与密码的显示与隐藏
    eye() {
      this.isShow = !this.isShow;
      this.Change = !this.Change;
      this.pwd = !this.pwd;
    },
    // 登录
    async login() {
      await this.$http({
        method: "post",
        url: "api/login",
        data: {
          account: this.text,
          password: this.password
        }
      })
        .then(res => {
          // 持久化的存储机制
          // localStorage.token = res.data.token;
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
            this.$message({
              message: "登录成功",
              type: "success",
              center: true,
              duration: 1400
            });
            // 将获取到的token存到本地浏览器中
            // sessionStorage.setItem("token", "true");
            window.sessionStorage.setItem("token", "true", res.data.token);
            this.$router.replace({
              path: "/primary"
            });
          }, 1200);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common-package/css/login.less";
</style>