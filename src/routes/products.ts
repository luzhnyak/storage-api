import { Router } from "express";

import { validate } from "../middlewares/validate";
import { productSchema } from "../schemas/productSchema";
import ctrl from "../controllers/products";

const router = Router();

router.get("/", ctrl.getAllProducts);

router.get("/:id", ctrl.getProductById);

router.post("/", validate(productSchema), ctrl.addProduct);

router.delete("/:id", ctrl.removeProduct);

router.put("/:id", validate(productSchema), ctrl.updateProduct);

export default router;
