const { HttpError, ctrlWrapper } = require("../helpers");
// const knex = require("../server");

const DB_HOST = "./db/data.db";

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: DB_HOST,
  },
  useNullAsDefault: true,
});

// ============================== Get All

const getAllCategories = async (req, res) => {
  const result = await knex("categories").select("*");

  res.json(result);
};

// ============================== Get by ID

const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  const result = await knex("categories").where("id", categoryId).first();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// ============================== Add

const addCategory = async (req, res) => {
  const id = await knex("categories").insert(req.body);
  const result = await knex("categories").where("id", id[0]).first();

  res.status(201).json(result);
};

// ============================== Delete

const removeCategory = async (req, res) => {
  const { categoryId } = req.params;
  const result = await knex("categories").where("id", categoryId).del();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Category deleted" });
};

// ============================== Update

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const result = await knex("categories")
    .where("id", categoryId)
    .update(req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  const updated = await knex("categories").where("id", categoryId).first();

  res.json(updated);
};

module.exports = {
  getAllCategories: ctrlWrapper(getAllCategories),
  getCategoryById: ctrlWrapper(getCategoryById),
  addCategory: ctrlWrapper(addCategory),
  removeCategory: ctrlWrapper(removeCategory),
  updateCategory: ctrlWrapper(updateCategory),
};
