<template>
  <div class="register_contain">
      <!-- 注册表单 -->
      <div class="register_box">
        <el-form class="el_form">
            <el-form-item>
                <h2>电商后台管理系统注册</h2>
            </el-form-item>
            <el-form-item>
                <el-input v-model="text"  placeholder="账号" prefix-icon="el-icon-user-solid" maxlength="15" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="password" type="password" placeholder="密码" prefix-icon="el-icon-lock" maxlength="10" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="password_again" type="password" placeholder="确认密码" prefix-icon="el-icon-lock" maxlength="10" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="text_name"  placeholder="昵称" prefix-icon="el-icon-loading" maxlength="5" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el_button">注册</el-button>
            </el-form-item>
            <el-form-item class="register_icon">
                <span class="social_register">社交账号注册</span>
                <svg class="icon" @mouseover="MouseOver(0)" @mouseout="MouseLeave(0)" :class="TabIndex==0?'hight_light':''">
                  <use xlink:href="#icon-weibo"></use>
                </svg>
                <svg class="icon" @mouseover="MouseOver(1)" @mouseout="MouseLeave(1)" :class="TabIndex==1?'hight_light':''">
                  <use xlink:href="#icon-github"></use>
                </svg>
                <svg class="icon" @mouseover="MouseOver(2)" @mouseout="MouseLeave(2)" :class="TabIndex==2?'hight_light':''">
                  <use xlink:href="#icon-QQ1"></use>
                </svg>
                <svg class="icon" @mouseover="MouseOver(3)" @mouseout="MouseLeave(3)" :class="TabIndex==3?'hight_light':''">
                  <use xlink:href="#icon-weixin"></use>
                </svg>
                <span @click="login_page" class="already" :style="active" @mouseover="MouseOver" @mouseleave="MouseLeave">使用已有的账号登陆</span>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
   name: 'register',
   data(){
       return {  
          text: '',
          password: '',
          password_again: '',
          text_name: '',
          active: '',
          // 图标高亮 
          TabIndex: -1,  
       } 
   },
   methods: {
       // 页面跳转    
       login_page(){
         this.$router.replace({
           path: '/login',
         })
       },
       MouseOver(index){
          this.active = 'color: #409eff;';
          this.TabIndex = index
       },
       MouseLeave(){
          this.active = '';
          this.TabIndex = -1
       },
   }
}
</script>

<style lang="less" scoped>
@import '../common-package/css/register.less';
</style>