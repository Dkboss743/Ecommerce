const Cart = require("../models/cart");
const Product = require("../models/product");
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      // console.log(rows);

      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            prods: products,
            path: "/cart",
            pageTitle: "Your Cart",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      ``;
    });
  // Cart.getCartProduct((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (const product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => +prod.id === +product.id
  //       );
  //       if (cartProductData) {
  //         +product.price *
  //           cartProducts.push({
  //             productData: product,
  //             qty: cartProductData.qty,
  //             totPrice: +product.price * +cartProductData.qty,
  //           });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       prods: cartProducts,
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //     });
  //   });
  // });
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
