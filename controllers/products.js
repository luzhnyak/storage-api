const { HttpError, ctrlWrapper } = require("../helpers");

const DB_HOST = "./db/data.db";

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: DB_HOST,
  },
  useNullAsDefault: true,
});

// ============================== Get All

const getAllProducts = async (req, res) => {
  const result = await knex("products").select("*");

  res.json(result);
};

// ============================== Get by ID

const getProductById = async (req, res) => {
  const { id } = req.params;

  const result = await knex("products").where("id", id).first();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// ============================== Add

const addProduct = async (req, res) => {
  const ids = await knex("products").insert(req.body);
  const result = await knex("products").where("id", ids[0]).first();

  res.status(201).json(result);
};

// ============================== Delete

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const result = await knex("products").where("id", id).del();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Product deleted" });
};

// ============================== Update

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const result = await knex("products").where("id", id).update(req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  const updated = await knex("products").where("id", id).first();

  res.json(updated);
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  getProductById: ctrlWrapper(getProductById),
  addProduct: ctrlWrapper(addProduct),
  removeProduct: ctrlWrapper(removeProduct),
  updateProduct: ctrlWrapper(updateProduct),
};
