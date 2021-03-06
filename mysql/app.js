const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const { engine } = require("express-handlebars");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
// app.engine(
//   "hbs",
//   engine({
//     defaultLayout: "main-layout",
//     extname: "hbs",
//     layoutsDir: "views/layout",
//   })
// );

// const { request } = require("http");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes.routes);
app.use(errorController.get404);
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
sequelize
  .sync({
    // force: true,
  })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
