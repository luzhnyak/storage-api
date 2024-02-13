const { HttpError, ctrlWrapper } = require("../../helpers");
const sequelize = require("../../db/config");

const Product = require("../models/product");
const Order = require("../models/order");
const OrderProduct = require("../models/orderProduct");

const refreshSumOrder = async (orderId) => {
  const order = await Order.findByPk(orderId);

  if (!order) return;

  const orderProducts = await OrderProduct.findAll({
    where: {
      order_id: orderId,
    },
  });

  const sum = orderProducts.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  await Order.update(
    {
      suma: sum,
    },
    {
      where: {
        id: orderId,
      },
    }
  );
};

module.exports = { refreshSumOrder };
