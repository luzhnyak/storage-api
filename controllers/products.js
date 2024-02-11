const { HttpError, ctrlWrapper } = require("../helpers");

const Product = require("../db/models/product");

// ============================== Get All

const getAllProducts = async (req, res) => {
  const PER_PAGE = 12;
  const { page = 1, category_id: categoryId = 0 } = req.query;

  let products;

  if (categoryId) {
    products = await Product.findAll({
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
      where: { category_id: categoryId },
    });
  } else {
    products = await Product.findAll({
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
    });
  }

  if (!products) {
    throw HttpError(404, "Not found");
  }

  res.json(products);
};

// ============================== Get by ID

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    throw HttpError(404, "Not found");
  }

  res.json(product);
};

// ============================== Add

const addProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json(product);
};

// ============================== Delete

const removeProduct = async (req, res) => {
  const { id } = req.params;

  let result = 0;

  if (id) {
    result = await Product.destroy({
      where: {
        id,
      },
    });
  }

  if (result <= 0) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Product deleted" });
};

// ============================== Update

const updateProduct = async (req, res) => {
  const { id } = req.params;

  let result;

  if (id) {
    result = await Brand.update(req.body, {
      where: {
        id: id,
      },
    });
  }

  if (result[0] <= 0) {
    throw HttpError(404, "Not found");
  }

  const product = await Product.findByPk(id);

  res.json(product);
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  getProductById: ctrlWrapper(getProductById),
  addProduct: ctrlWrapper(addProduct),
  removeProduct: ctrlWrapper(removeProduct),
  updateProduct: ctrlWrapper(updateProduct),
};
