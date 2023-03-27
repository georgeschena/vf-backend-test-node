const express = require("express");
const router = express.Router();

const fs = require("fs");

const productsFile = "products.json";

router.get("/", (req, res) => {
  let products = JSON.parse(fs.readFileSync(productsFile, "utf8"));

  const sortBy = req.query.sortBy;
  const order = req.query.order;

  if (order === "desc") {
    if (sortBy === "title") {
      products.products.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "price") {
      products.products.sort(
        (a, b) => b.variants[0].price - a.variants[0].price
      );
    }
  } else {
    if (sortBy === "title") {
      products.products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "price") {
      products.products.sort(
        (a, b) => a.variants[0].price - b.variants[0].price
      );
    }
  }

  res.json({ products });
});

module.exports = router;
