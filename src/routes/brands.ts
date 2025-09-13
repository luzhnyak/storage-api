import express from "express";
import Brand from "../models/Brand";
import { validate } from "../middleware/validate";
import { brandSchema } from "../schemas/brandSchema";

const router = express.Router();

router.get("/", async (_, res) => {
  const brands = await Brand.findAll();
  res.json(brands);
});

router.post("/", validate(brandSchema), async (req, res) => {
  const brand = await Brand.create(req.body);
  res.status(201).json(brand);
});

export default router;
