const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const productsRouter = require("./routes/api/products");
const categoriesRouter = require("./routes/api/categories");
const brandsRouter = require("./routes/api/brands");
const orderRouter = require("./routes/api/orders");

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/orders", orderRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
