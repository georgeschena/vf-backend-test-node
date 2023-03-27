const fs = require("fs");

const productsFile = "products.json";

const getProductById = (productId) => {
  let products = JSON.parse(fs.readFileSync(productsFile, "utf8"));

  const product = products.products.find((p) => p.id === productId);

  return product;
};

module.exports = {
  getProductById,
};
