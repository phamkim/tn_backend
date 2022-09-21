const userController = require("../controllers/user.controller")
    
module.exports = function (router)  {

    router.get("/user", userController.getAll);
    // router.post("/bangDia", bangDiaController.insert);
    // router.get("/bangDia/:id", bangDiaController.getById);
    // router.delete("/bangDia/:id", bangDiaController.delete);
    // router.put("/bangDia/:id", bangDiaController.update);
  };