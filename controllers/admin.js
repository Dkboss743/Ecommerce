const Product = require("../models/product");
exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: null,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  console.log(product);

  product
    .save()
    .then((result) => {
      // console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(typeof prodId, prodId, prodId.length);
  Product.deleteById(prodId)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (editMode !== "true") {
    res.redirect("/");
    return;
  }

  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      if (product.length == 0) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const product = new Product(
    updatedTitle,
    updatedPrice,

    updatedDesc,
    updatedImageUrl,
    prodId
  )
    .save()
    .then((result) => {
      console.log("Updated");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
