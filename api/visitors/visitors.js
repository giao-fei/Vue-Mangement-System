module.exports = (app) => {
  const { User } = require("./modules");
  // 查找所有用户
  app.get("/api/visitors", async (req, res) => {
    const users = await User.find();
    res.send(users);
  });
  // 添加用户
  app.post("/api/addVisitors", async (req, res) => {
    // 判断用户是否已经存在
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      return res.status(422).send({
        message: "用户已存在",
      });
    } else {
      const users = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      });
      res.send(users);
    }
  });
  // 删除用户
  app.delete("/api/delVisitors/:id", async (req, res) => {
    // 获取客户端传过来的id标识
    await User.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });
  // 更新用户
  // 查找需要更新的用户id
  app.get("/api/UpdateFind/:id", async (req, res) => {
    const model = await User.findById(req.params.id, req.body);
    res.send(model);
  });
  // 修改用户信息并保存
  app.put("/api/UpdateFind/:id", async (req, res) => {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      return res.status(422).send({
        message: "更新失败",
      });
    } else {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.send(user);
    }
  });
};
