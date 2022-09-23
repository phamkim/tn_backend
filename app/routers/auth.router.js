const UserService = require("../services/user.service");
const jwt = require("../common/jwt");
const path = require("path");
const imageToBase64 = require("image-to-base64");

const login = (req, res) => {
  const { userName, passW } = req.body;
  console.log(req.body);
  if (userName != "" && passW != "") {
    UserService.checkLogin(userName, passW, async (result) => {
      if (result) {
        const _token = await jwt.make(result);
        console.log("token: "+ _token);
        const _path = path.join(__dirname, "../../uploads/") + result?._avatar;
        var type = "";
        type = result?._avatar?.split(".")?.pop();
        if (type !== "") {
          const base64Data = `data:image/${type};base64,`;
          await imageToBase64(_path)
            .then((data) => {
              result._avatar = base64Data + data;
              res.send({ token: _token, user: result });
            })
            .catch((err) => {
              result._avatar = null;
              res.send({ token: _token, user: result });
              console.log(err);
            });
        } else {
          result._avatar = null;
          res.send({ token: _token, user: result });
        }
      } else {
        res.send({ token: null });
      }
    });
  } else {
    res.send({ token: null });
  }
};

module.exports = (router) => {
  router.post("/log-in", login);
};
