const express = require("express");
const { validateBody } = require("../../middlewares");
const { brandSchema } = require("../../shemas/brand");

const router = express.Router();

const ctrl = require("../../controllers/brands");

router.get("/", ctrl.getAllBrands);

router.get("/:id", ctrl.getBrandById);

router.post("/", validateBody(brandSchema), ctrl.addBrand);

router.delete("/:id", ctrl.removeBrand);

router.put("/:id", validateBody(brandSchema), ctrl.updateBrand);

module.exports = router;
