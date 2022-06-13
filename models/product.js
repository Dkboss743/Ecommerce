const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (cb) => {
  return fs.readFile(p, (err, fileData) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileData));
  });
};
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = parseInt(price);
  }
  save() {
    getProductsFromFile((products) => {
      console.log(this.id);
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );

        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        console.log(updatedProduct);

        fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        console.log(this);

        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
  static deleteProduct(id) {
    getProductsFromFile((products) => {
      const product = products.filter((p) => {
        return p.id === id;
      });
      // console.log(product);

      fs.writeFile(p, JSON.stringify(product), (err) => {
        console.log(err);
      });
    });
  }
};
