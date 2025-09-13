import express from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import OrderItem from "../models/OrderItem";
import ctrl from "../controllers/orders";
import { orderItemSchema, orderSchema } from "../schemas/orderSchema";
import { validate } from "../middleware/validate";

const router = express.Router();

router.get("/", ctrl.getAllOrders);

router.get("/:id", ctrl.getOrderById);

router.post("/", validate(orderSchema), ctrl.addOrder);

router.put("/:id", validate(orderItemSchema), ctrl.addProductToOrder);

router.delete("/:id", ctrl.removeOrder);
router.delete("/:id/:productId", ctrl.removeProductInOrder);

router.put("/:id", validate(orderSchema), ctrl.updateOrder);

router.patch(
  "/:id/:productId",
  validate(orderItemSchema),
  ctrl.updateProductInOrder
);

export default router;
