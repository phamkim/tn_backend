require('dotenv').config();
const express = require("express");
let app = express();
let port = process.env.PORT || 3001;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./app/routers/user.router")(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);
