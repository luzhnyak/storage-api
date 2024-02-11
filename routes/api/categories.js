const express = require("express");
const { validateBody } = require("../../middlewares");
const { categorySchema } = require("../../shemas/category");

const router = express.Router();

const ctrl = require("../../controllers/categories");

router.get("/", ctrl.getAllCategories);

router.get("/:id", ctrl.getCategoryById);

router.post("/", validateBody(categorySchema), ctrl.addCategory);

router.delete("/:id", ctrl.removeCategory);

router.put("/:id", validateBody(categorySchema), ctrl.updateCategory);

module.exports = router;
