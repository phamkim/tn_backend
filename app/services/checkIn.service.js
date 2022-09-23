const db = require("../common/connect");
const { v4: uuidv4 } = require("uuid");

const CheckInService = () => {};

CheckInService.findById = (req, res) => {
  const id = req.params.id;
  const sqlString = "SELECT * FROM _check_in WHERE _id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.send(result);
  });
};

CheckInService.getAll = (req, res) => {
  const sqlString = "SELECT * FROM _check_in ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.send(result);
  });
};

CheckInService.insert = (req, res) => {
  var data = req.body;
  data._id = uuidv4();

  const sqlString = "INSERT INTO _check_in SET ?";
  db.query(sqlString, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({ id: result.insertId, ...data });
  });
};

CheckInService.update = (req, res) => {
  const id = req.params.id;
  var data = req.body;
  data._id = uuidv4();

  const sqlString = "UPDATE _check_in SET ? WHERE _id = ?";
  db.query(sqlString, [data, id], (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result);
  });
};

CheckInService.delete = (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM _check_in WHERE _id = ?`, id, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result);
  });
};

module.exports = CheckInService;
