const UserService = require("../services/user.service");
const upload = require("../common/upload");

module.exports = (router) => {
  router.get("/user", UserService.getAll);
  router.post("/user", upload.single("file"), UserService.insert);
  router.get("/user/:id", UserService.findById);
  router.delete("/user/:id", UserService.delete);
  router.put("/user/:id", upload.single("file"), UserService.update);
};
