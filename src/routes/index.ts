import express from "express";

import auth from "./auth";
import users from "./users";
import products from "./products";
import brands from "./brands";
import categories from "./categories";
import transactions from "./transactions";

const router = express.Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/products", products);
router.use("/brands", brands);
router.use("/categories", categories);
router.use("/transactions", transactions);

export default router;
