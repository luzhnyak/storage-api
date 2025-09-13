import express from "express";
import Product from "../models/Product";
import Brand from "../models/Brand";
import Category from "../models/Category";
import { validate } from "../middleware/validate";
import { productSchema } from "../schemas/productSchema";
import ctrl from "../controllers/products";

const router = express.Router();

router.get("/", ctrl.getAllProducts);

router.get("/:id", ctrl.getProductById);

router.post("/", validate(productSchema), ctrl.addProduct);

router.delete("/:id", ctrl.removeProduct);

router.put("/:id", validate(productSchema), ctrl.updateProduct);

export default router;
