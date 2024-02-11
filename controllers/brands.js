const { HttpError, ctrlWrapper } = require("../helpers");

const Brand = require("../db/models/brand");

// ============================== Get All

const getAllBrands = async (req, res) => {
  const brand = await Brand.findAll();

  if (!brand) {
    throw HttpError(404, "Not found");
  }

  res.json(brand);
};

// ============================== Get by ID

const getBrandById = async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findByPk(id);

  if (!brand) {
    throw HttpError(404, "Not found");
  }

  res.json(brand);
};

// ============================== Add

const addBrand = async (req, res) => {
  const brand = await Brand.create(req.body);

  res.status(201).json(brand);
};

// ============================== Delete

const removeBrand = async (req, res) => {
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

  res.json({ message: "Brand deleted" });
};

// ============================== Update

const updateBrand = async (req, res) => {
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

  const brand = await Brand.findByPk(id);

  res.json(brand);
};

module.exports = {
  getAllBrands: ctrlWrapper(getAllBrands),
  getBrandById: ctrlWrapper(getBrandById),
  addBrand: ctrlWrapper(addBrand),
  removeBrand: ctrlWrapper(removeBrand),
  updateBrand: ctrlWrapper(updateBrand),
};
