require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;
const { isAuth } = require("./app/common/middleWare");

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./app/routers/auth.router")(app);

// app.use(isAuth)

require("./app/routers/user.router")(app);
require("./app/routers/catalog.router")(app);
require("./app/routers/post.router")(app);
require("./app/routers/checkIn.router")(app);
// require("./app/routers/event.router")(app);

app.listen(port);

console.log("RESTful API server started on: " + port);
