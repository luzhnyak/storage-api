const express = require("express");
const { validateBody } = require("../../middlewares");
const { productSchema } = require("../../shemas/product");

const router = express.Router();

const ctrl = require("../../controllers/products");

router.get("/", ctrl.getAllProducts);

router.get("/:id", ctrl.getProductById);

router.post("/", validateBody(productSchema), ctrl.addProduct);

router.delete("/:id", ctrl.removeProduct);

router.put("/:id", validateBody(productSchema), ctrl.updateProduct);

module.exports = router;
