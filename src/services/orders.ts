import Order from "../models/Order";
import OrderItem from "../models/OrderItem";

export const refreshSumOrder = async (orderId: number) => {
  const order = await Order.findByPk(orderId);

  if (!order) return;

  const orderProducts = await OrderItem.findAll({
    where: {
      orderId: orderId,
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
