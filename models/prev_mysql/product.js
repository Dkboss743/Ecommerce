const path = require("path");
const db = require("../util/database");
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = parseInt(price);
  }
  save() {
    return db.execute(
      "INSERT INTO product (title, price, imageUrl, description) VALUES(?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM product");
  }
  static findById(id) {
    return db.execute("SELECT * FROM product WHERE product.id = ?", [id]);
  }
  static deleteProduct(id) {}
};
