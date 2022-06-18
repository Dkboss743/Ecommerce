const Cart = require("../models/cart");
const Product = require("../models/product");
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Shop",
        path: "/products",
        hasProducts: rows.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([rows]) => {
      // console.log(rows);

      res.render("shop/product-detail", {
        product: rows[0],
        pageTitle: rows[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
        hasProducts: rows.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCartProduct((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          (prod) => +prod.id === +product.id
        );
        if (cartProductData) {
          +product.price *
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty,
              totPrice: +product.price * +cartProductData.qty,
            });
        }
      }
      console.log(cartProducts);

      res.render("shop/cart", {
        prods: cartProducts,
        path: "/cart",
        pageTitle: "Your Cart",
      });
    });
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};
