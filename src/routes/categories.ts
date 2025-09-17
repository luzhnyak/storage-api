import { Router } from "express";

import { validate } from "../middlewares/validate";
import { categorySchema } from "../schemas/categorySchema";
import ctrl from "../controllers/categories";

const router = Router();

router.get("/", ctrl.getAllCategories);

router.get("/:id", ctrl.getCategoryById);

router.post("/", validate(categorySchema), ctrl.addCategory);

router.delete("/:id", ctrl.removeCategory);

router.put("/:id", validate(categorySchema), ctrl.updateCategory);

export default router;
