const express = require("express");
const app = express();
const port = 3000;

const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
