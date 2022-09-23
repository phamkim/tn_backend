const PostService = require("../services/post.service");
const upload = require("../common/upload");

module.exports = (router) => {
  router.get("/post", PostService.getAll);
  router.post("/post", upload.single("file"), PostService.insert);
  router.get("/post/:id", PostService.findById);
  router.delete("/post/:id", PostService.delete);
  router.put("/post/:id", upload.single("file"), PostService.update);
};
