const db = require("../common/connect");
const path = require("path");
const imageToBase64 = require("image-to-base64");
const { v4: uuidv4 } = require('uuid');


const PostService = () => {};

PostService.findById = (req, res) => {
  const id = req.params.id;
  const sqlString = "SELECT * FROM _post WHERE _id = ? ";
  db.query(sqlString, id, async (err, result) => {
    if (err) {
      return res.send(err);
    }
    try {
      const _path =
        path.join(__dirname, "../../uploads/") + result[0]?._img_preview;
      var type = "";
      type = result[0]?._img_preview?.split(".")?.pop();
      if (type !== "") {
        const base64Data = `data:image/${type};base64,`;
        await imageToBase64(_path)
          .then((data) => {
            result[0]._img_preview = base64Data + data;
            res.send(result[0]);
          })
          .catch((err) => {
            res.send(result[0]);
            console.log(err);
          });
      } else {
        result[0]._img_preview = null;
        res.send(result[0]);
      }
    } catch (error) {
      res.send(error);
    }
  });
};

PostService.getAll = (req, res) => {
  const sqlString = "SELECT * FROM _post ";
  db.query(sqlString, async (err, result) => {
    if (err) {
      return res.send(err);
    }
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      const _path =
        path.join(__dirname, "../../uploads/") + element?._img_preview;
      var type = "";
      type = element?._img_preview?.split(".")?.pop();
      if (type !== "") {
        const base64Data = `data:image/${type};base64,`;
        await imageToBase64(_path)
          .then((data) => {
            element._img_preview = base64Data + data;
            result[i] = element;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        element._img_preview = null;
        result[i] = element;
      }
    }
    res.send(result);
  });
};

PostService.insert = (req, res) => {
  const data = {
    _id: uuidv4(),
    _title: req.body.title,
    _time: req.body.time,
    _des: req.body.des,
    _img_preview: req.file?.filename,
    _content: req.body.content,
    _category: req.body.category,
    _url: req.body.url,
  };

  // _title text,
  // _time text,
  // _img_preview text,
  // _content text,
  // _category text,
  // _url text

  const sqlString = "INSERT INTO _post SET ?";
  db.query(sqlString, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({...data });
  });
};

PostService.update = (req, res) => {
  const id = req.params.id;
  const data = {
    _id: uuidv4(),
    _title: req.body.title,
    _time: req.body.time,
    _des: req.body.des,
    _img_preview: req.file?.filename,
    _content: req.body.content,
    _category: req.body.category,
    _url: req.body.url,
  };
  const sqlString = "UPDATE _post SET ? WHERE _id = ?";
  db.query(sqlString, [data, id], (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result);
  });
};

PostService.delete = (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM _post WHERE _id = ?`, id, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result);
  });
};

module.exports = PostService;
