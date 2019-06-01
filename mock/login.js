export default {
  "post /api/login"(req, res, next) {
    const { username, password } = req.body;
    if (username == "kaikeba" && password == "123") {
      return res.json({
        code: 0,
        data: {
          token: "kaikebaisgood",
          role: "admin",
          balance: 1000,
          username: "kaikeba"
        }
      });
    }
    return res.status(401).json({
      code: -1,
      msg: "密码错误"
    });
  }
};
