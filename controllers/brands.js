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

const getAllBrands = async (req, res) => {
  const result = await knex("brands").select("*");

  res.json(result);
};

// ============================== Get by ID

const getBrandById = async (req, res) => {
  const { id } = req.params;

  const result = await knex("brands").where("id", id).first();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// ============================== Add

const addBrand = async (req, res) => {
  const ids = await knex("brands").insert(req.body);
  const result = await knex("brands").where("id", ids[0]).first();

  res.status(201).json(result);
};

// ============================== Delete

const removeBrand = async (req, res) => {
  const { id } = req.params;
  const result = await knex("brands").where("id", id).del();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Brand deleted" });
};

// ============================== Update

const updateBrand = async (req, res) => {
  const { id } = req.params;
  const result = await knex("brands").where("id", id).update(req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  const updated = await knex("brands").where("id", id).first();

  res.json(updated);
};

module.exports = {
  getAllBrands: ctrlWrapper(getAllBrands),
  getBrandById: ctrlWrapper(getBrandById),
  addBrand: ctrlWrapper(addBrand),
  removeBrand: ctrlWrapper(removeBrand),
  updateBrand: ctrlWrapper(updateBrand),
};
