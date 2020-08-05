module.exports = (app) => {
  // 导入数据库
  const { User } = require("./modules");
  // 生成token的密钥，全局保持唯一的
  const SECRET = "sdjiso898sdf8jk38i";
  // 查询用户 --> 查询数据 --> 登录接口
  // 校验账号
  app.post("/api/login", async (req, res) => {
    // const user = await User.find() // 查询所有数据
    const { account, password } = req.body;
    const user = await User.findOne({ account }).select("+password"); // 定义一个user 让数据库里的account跟客户端返回过来的account进行对比
    if (!user) {
      return res.status(422).send({
        message: "账号不存在",
      });
    }
    // 引入生成token的插件
    const jwt = require("jsonwebtoken");
    // 校验密码
    const isValid = require("bcryptjs").compareSync(
      password, // 客户端传过来的密码
      user.password // 数据库里面储存的密码
    );
    if (!isValid) return res.status(422).send({ message: "密码错误" });

    // 生成token
    const token = jwt.sign({ id: String(user._id) }, SECRET);
    res.send({ user, token });
  });
};
