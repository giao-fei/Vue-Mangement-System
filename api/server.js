// const { User } = require("./modules/modules");
const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");

// 设置跨域
// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", " 3.2.1");
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });
app.use(require("cors")()); // 跨域模块
app.use(bodyParser.json()); // // 解析 json 格式
app.use(bodyParser.urlencoded({ extended: true })); // 解析 urlencoded 格式

// 登录接口
require("./login/login")(app);

// visitors接口
require("./visitors/visitors")(app);

// 创建用户 --> 插入数据 --> 注册
// app.post("/api/register", async (req, res) => {
//   // const account = req.body.account;
//   // const password = req.body.password;
//   const user = await User.create({
//     account: req.body.account,
//     password: req.body.password,
//   });
//   res.send(user);
// });

app.use(express.static(path.join(__dirname, "public")));
// 监听端口
app.listen(8081, () => {
  console.log("http://localhost:8081");
});
