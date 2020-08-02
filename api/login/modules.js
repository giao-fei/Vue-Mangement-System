// 引入数据库
var mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/database", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 创建用户规则
const UserSchema = new mongoose.Schema({
  // unique: true 这个字段是否为唯一的
  account: { type: String, unique: true },
  password: {
    type: String,
    // 加密密码
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
  //   name: { type: String },
  //   email: { type: String },
  //   phone: { type: String },
  //   address: { type: String },
});

// 将要访问database库下的users表
const User = mongoose.model("users", UserSchema);

// 导出模型
module.exports = { User };
