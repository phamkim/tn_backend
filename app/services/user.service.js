const db = require("../common/connect");
const path = require("path");
const imageToBase64 = require("image-to-base64");
const { v4: uuidv4 } = require("uuid");

const UserService = () => {};

UserService.checkLogin = (userName, passW, callBack) => {
  db.query(
    `SELECT * FROM _user WHERE _phone = ? AND _birthday = ?`,
    [userName, passW],
    (err, result) => {
      try {
        if (err || result.length === 0) {
          callBack(null);
          return;
        }
        console.log(result)
        callBack(result[0]);
      } catch (error) {
        console.log(error);
      }
    }
  );
};

UserService.getAll = (req, res) => {
  const sqlString = "SELECT * FROM _user ";
  db.query(sqlString, async (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      const _path = path.join(__dirname, "../../uploads/") + element?._avatar;
      var type = "";
      type = element?._avatar?.split(".")?.pop();
      if (type !== "") {
        const base64Data = `data:image/${type};base64,`;
        await imageToBase64(_path)
          .then((data) => {
            element._avatar = base64Data + data;
            result[i] = element;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        element._avatar = null;
        result[i] = element;
      }
    }

    res.send(result);
  });
};

UserService.findById = (req, res) => {
  const id = req.params.id;
  console.log("find user: " + id);
  const sqlString = "SELECT * FROM _user WHERE _id = ? ";
  db.query(sqlString, id, async (err, result) => {
    if (err) {
      return res.send(err);
    }
    try {
      const _path = path.join(__dirname, "../../uploads/") + result[0]?._avatar;
      var type = "";
      type = result[0]?._avatar?.split(".")?.pop();
      if (type !== "") {
        const base64Data = `data:image/${type};base64,`;
        await imageToBase64(_path)
          .then((data) => {
            result[0]._avatar = base64Data + data;
            res.send(result[0]);
          })
          .catch((err) => {
            res.send(result[0]);
            console.log(err);
          });
      } else {
        result[0]._avatar = null;
        res.send(result[0]);
      }
    } catch (error) {
      res.send(error);
    }
  });
};

UserService.insert = (req, res) => {
  console.log(req.avatar);
  const data = {
    _id: uuidv4(),
    _name: req.body.name,
    _birthday: req.body.birthday,
    _phone: req.body.phone,
    _avatar: req.file?.filename,
    _gender: req.body.gender,
    _seat_position: req.body.seat_position,
    _delegation: req.body.delegation,
    _role: req.body.role,
  };
  const sqlString = "INSERT INTO _user SET ?";
  db.query(sqlString, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({ _id: result.insertId, ...data });
  });
};

UserService.update = (req, res) => {
  const id = req.params.id;
  const data = {
    _id: uuidv4(),
    _name: req.body.name,
    _birthday: req.body.birthday,
    _phone: req.body.phone,
    _avatar: req.file?.filename,
    _gender: req.body.gender,
    _seat_position: req.body.seat_position,
    _delegation: req.body.delegation,
    _role: req.body.role,
  };
  const sqlString = "UPDATE _user SET ? WHERE _id = ?";
  db.query(sqlString, [data, id], (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result);
  });
};

UserService.delete = (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM _user WHERE _id = ?`, id, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result);
  });
};

module.exports = UserService;
