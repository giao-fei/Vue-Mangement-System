<template>
  <div>
    <el-container style="height: 100vh;">
      <el-aside :width="isCollapse ? '64px' : '200px'" style=" margin-top: 60px;">
        <!-- 折叠和展开 -->
        <!-- <div class="toggle-button" @click="toggleCollapse">
          <span class="show" v-if="isShow">|||</span>
        </div>-->
        <div class="show-button" @click="showCollapse" v-show="isShow">|||</div>
        <div class="hide-button" @click="hideCollapse" v-show="!isShow">三</div>
        <!-- 左侧菜单栏 -->
        <el-menu
          :default-active="activeIndex"
          router
          :default-openeds="openeds"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#333744"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span class="el-text">用户管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">user mange</template>
              <el-menu-item
                index="/primary/user_table"
                :class="TabIndex == 0 ? 'active' : ''"
                @click="btn(0)"
              >用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-key"></i>
              <span class="el-text">权限管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">authority mange</template>
              <el-menu-item
                index="/primary/admin_table"
                :class="TabIndex == 1 ? 'active' : ''"
                @click="btn(1)"
              >管理员列表</el-menu-item>
              <el-menu-item
                index="/primary/user_authority"
                :class="TabIndex == 2 ? 'active' : ''"
                @click="btn(2)"
              >用户权限</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span class="el-text">商品管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">commodity mange</template>
              <el-menu-item
                index="/primary/product_list"
                :class="TabIndex == 3 ? 'active' : ''"
                @click="btn(3)"
              >商品列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-data-line"></i>
              <span class="el-text">数据统计</span>
            </template>
            <el-menu-item-group>
              <template slot="title">data statistics</template>
              <el-menu-item
                index="/primary/user_statistics"
                :class="TabIndex == 4 ? 'active' : ''"
                @click="btn(4)"
              >用户统计</el-menu-item>
              <el-menu-item
                index="/primary/orders_received_statistics"
                :class="TabIndex == 5 ? 'active' : ''"
                @click="btn(5)"
              >订单统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span class="el-text">系统设置</span>
            </template>
            <el-menu-item-group title="system settings">
              <el-submenu index="5-1">
                <template slot="title">
                  <span style="color: white;">我的设置</span>
                </template>
                <el-menu-item
                  index="/primary/my_setting/update_myself"
                  :class="TabIndex == 6 ? 'active' : ''"
                  @click="btn(6)"
                >修改我的资料</el-menu-item>
                <el-menu-item
                  index="/primary/my_setting/close_account"
                  :class="TabIndex == 7 ? 'active' : ''"
                  @click="btn(7)"
                >注销账号</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="position: absolute; z-index: 9; left: 0;">
          <div style="font-size: 25px; font-family: 宋体; margin-left: -10px; color: #fff;">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huabanfuben" />
            </svg>
            电商后台管理系统
          </div>
        </el-header>
        <el-header style="text-align: right; font-size: 12px; position: relative; top: 0;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px; cursor: pointer; color: #fff;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color: #fff;">王小虎</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "primary",
  data() {
    return {
      fullscreenLoading: false,
      // 所有的菜单都闭合
      activeIndex: "1",
      // 第一个字体为蓝色
      TabIndex: 0,
      // 第一个菜单展开
      openeds: ["1"],
      // 折叠与展开
      isCollapse: false,
      isShow: true
    };
  },
  methods: {
    // 退出登录
    logout() {
      // sessionStorage.setItem("token", "false");
      window.sessionStorage.clear("token", "false");
      // this.$router.push("/login");
      const loading = this.$loading({
        lock: true,
        text: "退出中......",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.$router.push("/login");
      }, 1200);
    },
    // 单击变色
    btn(index) {
      this.TabIndex = index;
    },
    // 同时折叠并展开
    // toggleCollapse() {
    //   this.isCollapse = !this.isCollapse;
    // },
    // 展开
    showCollapse() {
      this.isCollapse = !this.isCollapse;
      this.isShow = false;
    },
    hideCollapse() {
      this.isCollapse = !this.isCollapse;
      this.isShow = true;
    }
  }
};
</script>

<style>
.el-header {
  background-color: #333744;
  line-height: 60px;
}

.el-aside {
  color: #333;
  background-color: #333744;
  overflow: hidden;
}
/* 让所有子菜单中的字变为白色 */
.el-menu-item {
  color: white;
}
/* 隔行变色 */
.active {
  color: #639eff;
}
/* 菜单栏中的文字 */
.el-text {
  position: absolute;
  top: -2px;
  color: white;
}

/* 折叠与展开 */
/* .toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
} */
/* 展开效果 */
.show-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  position: relative;
  z-index: 9;
}
/* 隐藏效果 */
.hide-button {
  position: relative;
  background-color: #4a5064;
  font-size: 13px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
