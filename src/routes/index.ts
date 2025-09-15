import express from "express";
import products from "./products";
import brands from "./brands";
import categories from "./categories";
import orders from "./transactions";

const router = express.Router();

router.use("/products", products);
router.use("/brands", brands);
router.use("/categories", categories);
router.use("/orders", orders);

export default router;
