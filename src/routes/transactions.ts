import { Router } from "express";

import ctrl from "../controllers/transactions";
import {
  transactionItemSchema,
  transactionSchema,
} from "../schemas/transactionSchema";
import { validate } from "../middlewares/validate";

const router = Router();

router.get("/", ctrl.getAllTransactions);

router.get("/:id", ctrl.getTransactionById);

router.post("/", validate(transactionSchema), ctrl.addTransaction);

router.put(
  "/:id",
  validate(transactionItemSchema),
  ctrl.addProductToTransaction
);

router.delete("/:id", ctrl.removeTransaction);
router.delete("/:id/:productId", ctrl.removeProductInTransaction);

router.put("/:id", validate(transactionSchema), ctrl.updateTransaction);

router.patch(
  "/:id/:productId",
  validate(transactionItemSchema),
  ctrl.updateProductInTransaction
);

export default router;
