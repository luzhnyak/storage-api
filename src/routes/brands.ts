import express from "express";
import Brand from "../models/Brand";
import { validate } from "../middleware/validate";
import { brandSchema } from "../schemas/brandSchema";
import ctrl from "../controllers/brands";

const router = express.Router();

router.get("/", ctrl.getAllBrands);

router.get("/:id", ctrl.getBrandById);

router.post("/", validate(brandSchema), ctrl.addBrand);

router.delete("/:id", ctrl.removeBrand);

router.put("/:id", validate(brandSchema), ctrl.updateBrand);

export default router;
