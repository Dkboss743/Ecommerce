// const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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

  Product.findById(prodId)
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
  Product.fetchAll()
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

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/");
    });
};
exports.getCart = (req, res, next) => {
  req.user
    .getUserCart()
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
};
