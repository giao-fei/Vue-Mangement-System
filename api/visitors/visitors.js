module.exports = (app) => {
  const { User } = require("./modules");
  // 查找所有用户
  app.get("/api/visitors", async (req, res) => {
    const users = await User.find();
    res.send(users);
  });
  // 添加用户
  app.post("/api/addVisitors", async (req, res) => {
    const users = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });
    res.send(users);
  });
};
