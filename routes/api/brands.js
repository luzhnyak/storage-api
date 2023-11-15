const express = require("express");
const { validateBody } = require("../../middlewares");
const { brandSchema } = require("../../models/brand");

const router = express.Router();

const ctrl = require("../../controllers/brands");

router.get("/", ctrl.getAllBrands);

router.get("/:categoryId", ctrl.getBrandById);

router.post("/", validateBody(brandSchema), ctrl.addBrand);

router.delete("/:categoryId", ctrl.removeBrand);

router.put("/:categoryId", validateBody(brandSchema), ctrl.updateBrand);

module.exports = router;
