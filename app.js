const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const mongoConnect = require("./util/database").mongoConnect;
const mongodb = require("mongodb");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use((req, res, next) => {
  User.findById(new mongodb.ObjectId("62af65fbc917411fc7129b37"))
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")));
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes.routes);
app.use(errorController.get404);
mongoConnect(() => {
  app.listen(3000);
});
