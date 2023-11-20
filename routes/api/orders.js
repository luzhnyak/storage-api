const express = require("express");
const { validateBody } = require("../../middlewares");
const { orderSchema, orderProductSchema } = require("../../models/order");

const router = express.Router();

const ctrl = require("../../controllers/orders");

router.get("/", ctrl.getAllOrders);

router.get("/:orderId", ctrl.getOrderById);

router.post("/", validateBody(orderSchema), ctrl.addOrder);

router.post(
  "/:orderId/",
  validateBody(orderProductSchema),
  ctrl.addProductToOrder
);

router.delete("/:orderId", ctrl.removeOrder);
router.delete("/:orderId/:productId", ctrl.removeProductInOrder);

router.put("/:orderId", validateBody(orderSchema), ctrl.updateOrder);

router.put(
  "/:orderId/:productId",
  validateBody(orderProductSchema),
  ctrl.updateProductInOrder
);

module.exports = router;
