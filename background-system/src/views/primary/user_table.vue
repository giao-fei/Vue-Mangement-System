<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/primary/user_table' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card" shadow="always">
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- trim是用来禁止input中有空格 -->
          <el-input
            placeholder="请输入要搜索的名字"
            v-model.trim="keywords"
            clearable
            @clear="getUserList"
            suffix-icon="el-icon-search"
          ></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table
        border
        :data="search(keywords).slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
      >
        <el-table-column type="index" label="ID" prop="_id"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="操作" width="175px">
          <template slot-scope="scope">
            <!-- 修改用户信息 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row)"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.length"
      ></el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="40%">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model.trim="addForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model.trim="addForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model.trim="addForm.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-input v-model.trim="addForm.address" clearable></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="Nosure">取 消</el-button>
        <el-button type="primary" @click="addVisitors">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息 -->
    <el-dialog
      title="修改个人信息"
      :visible.sync="editDialogVisible"
      width="40%"
      center
      @close="editDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model.trim="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model.trim="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model.trim="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-input v-model.trim="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateVisitors">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user_table",
  data() {
    return {
      isShow: true, // 表格显示隐藏的问题
      keywords: "", // 输入框内的内容
      // 渲染数据到表格中
      userList: [],
      currentPage: 1, // 初始页
      pagesize: 5, // 每页的数据
      addDialogVisible: false, // 添加用户对话框的显示与隐藏
      addForm: {
        name: "",
        email: "",
        phone: "",
        address: "",
      }, // 添加用户的表单数据
      // 添加表单的验证规则对象
      addFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            required: true,
            pattern: /^1[34578]\d{9}$/, //可以写正则表达式
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur",
          },
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
      },
      // 用来展示修改用户列表的
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改用户列表的验证规则
      editFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            required: true,
            pattern: /^1[34578]\d{9}$/, //可以写正则表达式
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur",
          },
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
      },
    };
  },
  // 数据渲染
  created: function () {
    this.getUserList();
  },
  methods: {
    // 显示用户
    async getUserList() {
      // var that = this;
      await this.$http.get("/api/visitors").then((res) => {
        this.userList = res.data;
      });
    },
    // 添加用户
    addVisitors() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        await this.$http.post("/api/addVisitors", this.addForm).then((res) => {
          // 隐藏添加用户的对话框
          this.$message({
            type: "success",
            message: "添加用户成功",
            center: true,
            showClose: true,
            duration: 1000,
          });
          this.getUserList(); // 重新获取用户列表
          this.$refs.addFormRef.resetFields(); // 当表单提交后清空表单内容
          this.addDialogVisible = false;
          console.log(res);
        });
      });
    },
    // 取消添加用户
    Nosure() {
      this.addDialogVisible = false; // 点击取消页面关闭
      this.$refs.addFormRef.resetFields(); // 清空列表
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      this.getUserList();
      // console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.getUserList();
      // console.log(this.currentPage); //点击第几页
    },
    search(keywords) {
      // 根据关键字，进行数据的搜索
      var newList = [];
      this.userList.forEach((item) => {
        if (item.name.indexOf(keywords) !== -1) {
          // newList.unshift(item);
          newList.push(item);
        }
      });
      return newList;
    },
    // 删除用户
    async del(row) {
      await this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`/api/delVisitors/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
          center: true,
          duration: 800,
          showClose: true,
        });
        this.getUserList();
        console.log(res);
      });
    },
    // 展示编辑用户的对话框
    async showEditDialog(row) {
      // console.log(_id);
      // 让输入框里面的内容等于返回过来的结果
      await this.$http.get(`/api/UpdateFind/${row._id}`).then((res) => {
        this.editForm = res.data;
      });
      this.editDialogVisible = true; // 展示更新用户信息面板
    },
    // editDialogClosed() {
    //   this.$refs.editFormRef.resetFields();
    // },
    async updateVisitors() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        await this.$http
          .put(`/api/UpdateFind/${this.editForm._id}`, this.editForm)
          .then((res) => {
            this.$message({
              type: "success",
              message: "更改成功",
              center: true,
              showClose: true,
              duration: 1000,
            });
            console.log(res);
            this.getUserList(); // 重新获取用户列表
            this.editDialogVisible = false;
          });
      });
    },
    // 取消更新
  },
};
</script>

<style lang="less" scoped>
// 卡片区域
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  margin-top: 30px;
}

.el-row {
  margin-bottom: 30px;
}

.el-table {
  font-size: 13px;
}

// 分页
.el-pagination {
  margin-top: 20px;
}
</style>
