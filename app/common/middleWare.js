const jwt = require("./jwt");

const isAuth = async (req, res, next) => {
  var _token = req.headers.authorization;
  if (_token) {
    try {
      console.log("token from client: " + _token);
      var authData = await jwt.check(_token);
      req.auth = authData;
      next();
    } catch (err) {
      return res.send({ result: "mã token không hợp lệ" });
    }
  } else {
    return res.send({ result: "bạn chưa gửi kèm token" });
  }
};

module.exports = {
  isAuth: isAuth,
};
