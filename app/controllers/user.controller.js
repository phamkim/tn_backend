const UserService = require("../services/user.service");

module.exports = {
  getAll: (req, res) => {
    UserService.getAll((result) => {
      res.send(result);
    });
  },
};
