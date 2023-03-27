const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const fs = require("fs");
const app = require("../server");
const { getProductById } = require("../controllers/productController");

chai.use(chaiHttp);

const CART_FILE =
  process.env.NODE_ENV === "test" ? "test-cart.json" : "cart.json";

describe("Post cart", function () {
  before(function () {
    fs.writeFileSync(CART_FILE, JSON.stringify({ items: [], totalPrice: 0 }));
  });

  after(function () {
    fs.unlinkSync(CART_FILE);
  });

  describe("POST /cart", function () {
    it("should add an item to the cart", function (done) {
      const productId = 7596624904422;
      const quantity = 1;
      const product = getProductById(productId);

      chai
        .request(app)
        .post("/cart")
        .send({ productId, quantity })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            items: [
              {
                productId,
                title: product.title,
                quantity,
                price: product.variants[0].price,
              },
            ],
            totalPrice: 8,
          });
          done();
        });
    });

    it("should update the quantity of an existing item in the cart", function (done) {
      const productId = 7596624904422;
      const quantity = 1;
      const product = getProductById(productId);

      chai
        .request(app)
        .post("/cart")
        .send({ productId, quantity })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            items: [
              {
                productId,
                title: product.title,
                quantity: 2,
                price: product.variants[0].price,
              },
            ],
            totalPrice: 16,
          });
          done();
        });
    });

    it("should return an error if the product is not found", function (done) {
      const productId = 999;
      const quantity = 2;

      chai
        .request(app)
        .post("/cart")
        .send({ productId, quantity })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.text).to.equal("Product not found");
          done();
        });
    });
  });

  describe("GET /cart", function () {
    it("should return the current state of the cart", function (done) {
      chai
        .request(app)
        .get("/cart")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            items: [
              {
                price: "8.00",
                productId: 7596624904422,
                quantity: 2,
                title: "Classic Sticker Pack",
              },
            ],
            totalPrice: 16,
          });
          done();
        });
    });
  });
});
