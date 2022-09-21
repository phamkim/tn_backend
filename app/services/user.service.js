const db = require("../common/connect");

const UserService = () => {};

UserService.getAll = (callback) => {
    const sqlString = "SELECT * FROM _user ";
    db.query(sqlString, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(result);
    });
  };

module.exports = UserService;