const express = require("express");
const { validateBody } = require("../../middlewares");
const { categorySchema } = require("../../models/category");

const router = express.Router();

const ctrl = require("../../controllers/categories");

router.get("/", ctrl.getAllCategories);

router.get("/:categoryId", ctrl.getCategoryById);

router.post("/", validateBody(categorySchema), ctrl.addCategory);

router.delete("/:categoryId", ctrl.removeCategory);

router.put("/:categoryId", validateBody(categorySchema), ctrl.updateCategory);

module.exports = router;
