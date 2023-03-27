const request = require("supertest");
const nock = require("nock");
const app = require("../server");
const expect = require("chai").expect;

const productsFile = "products.json";

describe("GET /products", () => {
  beforeEach(() => {
    jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue(JSON.parse(fs.readFileSync(productsFile, "utf8")));

    nock("http://localhost:3000")
      .get("/products?sortBy=title&order=asc")
      .reply(200, JSON.parse(fs.readFileSync(productsFile, "utf8")));
  });
});

it("should return all products sorted by title in ascending order", async () => {
  const response = await request(app).get("/products?sortBy=title&order=asc");

  expect(response.status).to.equal(200);
  expect(response.body.products.products.length).to.be.greaterThan(0);
});

it("should return all products sorted by title in descending order", async () => {
  const response = await request(app).get("/products?sortBy=title&order=desc");

  expect(response.status).to.equal(200);
  expect(response.body.products.products.length).to.be.greaterThan(0);
});

it("should return all products sorted by price in ascending order", async () => {
  const response = await request(app).get("/products?sortBy=price&order=asc");

  expect(response.status).to.equal(200);
  expect(response.body.products.products.length).to.be.greaterThan(0);
});

it("should return all products sorted by price in descending order", async () => {
  const response = await request(app).get("/products?sortBy=price&order=desc");

  expect(response.status).to.equal(200);
  expect(response.body.products.products.length).to.be.greaterThan(0);
});
