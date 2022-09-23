const db = require("../common/connect");
const path = require("path");
const pdf2base64 = require("pdf-to-base64");
const { v4: uuidv4 } = require('uuid');

const CatalogService = () => {};

CatalogService.insert = (req, res) => {
  const data = {
    _id: uuidv4(),
    _name: req.body.name,
    _pdf: req.file?.filename,
    _title: req.body.title,
    _des: req.body.des,
  };
  const qurey = `INSERT INTO _catalog SET ?`;
  db.query(qurey, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({ _id: result.insertId, ...data });
  });
};

CatalogService.getAll = (req, res) => {
  const query = `SELECT * FROM _catalog`;
  db.query(query, async (err, result) => {
    if (err) {
      return res.send(err);
    }
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      const _path = path.join(__dirname, "../../uploads/") + element?._pdf;
      var type = "";
      type = element?._pdf?.split(".")?.pop();
      if (type !== "") {
        const base64Data = `data:application/${type};base64,`;
        await pdf2base64(_path)
          .then((data) => {
            element._pdf = base64Data + data;
            result[i] = element;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        element._pdf = null;
        result[i] = element;
      }
    }

    res.send(result);
  });
};

CatalogService.findById = async (req, res) => {
  const id = req.params.id;
  const sqlString = "SELECT * FROM _catalog WHERE _id = ?";
  db.query(sqlString, id, async (err, result) => {
    if (err) {
      return res.send(err);
    }
    const _path = path.join(__dirname, "../../uploads/") + result[0]?._pdf;
    var type = "";
    type = result[0]?._pdf?.split(".")?.pop();
    console.log(type);
    if (type !== "") {
      const base64Data = `data:application/${type};base64,`;
      await pdf2base64(_path)
        .then((data) => {
          result[0]._pdf = base64Data + data;
          res.send(result[0]);
        })
        .catch((err) => {
          res.send(result[0]);
          console.log(err);
        });
    } else {
      result[0]._pdf = null;
      res.send(result[0]);
    }
  });
};

CatalogService.update = (req, res) => {
  const data = {
    _id: uuidv4(),
    _name: req.body.name,
    _pdf: req.file?.filename,
    _title: req.body.title,
    _des: req.body.des,
  };
  const id = req.params.id;
  const sqlString = "UPDATE _catalog SET ? WHERE _id = ?";
  db.query(sqlString, [data, id], (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result);
  });
};

CatalogService.delete = (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM _catalog WHERE _id = ?`, id, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result);
  });
};

module.exports = CatalogService;
