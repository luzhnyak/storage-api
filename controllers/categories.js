const { HttpError, ctrlWrapper } = require("../helpers");

const Category = require("../db/models/category");

// ============================== Get All

const getAllCategories = async (req, res) => {
  const category = await Category.findAll();

  if (!category) {
    throw HttpError(404, "Not found");
  }

  res.json(category);
};

// ============================== Get by ID

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    throw HttpError(404, "Not found");
  }

  res.json(category);
};

// ============================== Add

const addCategory = async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json(category);
};

// ============================== Delete

const removeCategory = async (req, res) => {
  const { id } = req.params;

  let result = 0;

  if (id) {
    result = await Brand.destroy({
      where: {
        id,
      },
    });
  }

  if (result <= 0) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Category deleted" });
};

// ============================== Update

const updateCategory = async (req, res) => {
  const { id } = req.params;

  let result;

  if (id) {
    result = await Category.update(req.body, {
      where: {
        id: id,
      },
    });
  }

  if (result[0] <= 0) {
    throw HttpError(404, "Not found");
  }

  const category = await Category.findByPk(id);

  res.json(category);
};

module.exports = {
  getAllCategories: ctrlWrapper(getAllCategories),
  getCategoryById: ctrlWrapper(getCategoryById),
  addCategory: ctrlWrapper(addCategory),
  removeCategory: ctrlWrapper(removeCategory),
  updateCategory: ctrlWrapper(updateCategory),
};
