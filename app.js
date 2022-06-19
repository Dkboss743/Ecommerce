const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
// const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const mongoConnect = require("./util/database").mongoConnect;
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")));
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes.routes);
app.use(errorController.get404);
mongoConnect(() => {
  app.listen(3000);
});
