const express = require("express");
const router = express.Router();
const fs = require("fs");

const { getProductById } = require("../controllers/productController");

const CART_FILE = "cart.json";

let cartData = { items: [], totalPrice: 0 };

try {
  const cartContent = fs.readFileSync(CART_FILE, "utf-8");
  cartData = JSON.parse(cartContent);
} catch (err) {
  console.error(`Error reading cart file: ${err}`);
}

router.post("/", (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  const product = getProductById(productId);

  if (!product) {
    res.status(404).send("Product not found");
    return;
  }

  const cartItemIndex = cartData.items.findIndex(
    (item) => item.productId === productId
  );

  if (cartItemIndex === -1) {
    cartData.items.push({
      productId: productId,
      title: product.title,
      quantity: quantity,
      price: product.variants[0].price,
    });
  } else {
    cartData.items[cartItemIndex].quantity += quantity;
  }

  cartData.totalPrice = cartData.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  try {
    fs.writeFileSync(CART_FILE, JSON.stringify(cartData));
  } catch (err) {
    console.error(`Error writing cart file: ${err}`);
  }

  res.send(cartData);
});

router.get("/", (req, res) => {
  res.send(cartData);
});

module.exports = router;
