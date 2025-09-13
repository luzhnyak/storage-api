import express from "express";
import Category from "../models/Category";
import { validate } from "../middleware/validate";
import { categorySchema } from "../schemas/categorySchema";
import ctrl from "../controllers/categories";

const router = express.Router();

router.get("/", ctrl.getAllCategories);

router.get("/:id", ctrl.getCategoryById);

router.post("/", validate(categorySchema), ctrl.addCategory);

router.delete("/:id", ctrl.removeCategory);

router.put("/:id", validate(categorySchema), ctrl.updateCategory);

export default router;
