const express = require("express");
const { validateBody } = require("../../middlewares");
const { orderSchema, orderProductSchema } = require("../../shemas/order");

const router = express.Router();

const ctrl = require("../../controllers/orders");

router.get("/", ctrl.getAllOrders);

router.get("/:id", ctrl.getOrderById);

router.post("/", validateBody(orderSchema), ctrl.addOrder);

router.put("/:id", validateBody(orderProductSchema), ctrl.addProductToOrder);

router.delete("/:id", ctrl.removeOrder);
router.delete("/:orderId/:productId", ctrl.removeProductInOrder);

router.put("/:id", validateBody(orderSchema), ctrl.updateOrder);

router.put(
  "/:orderId/:productId",
  validateBody(orderProductSchema),
  ctrl.updateProductInOrder
);

module.exports = router;
