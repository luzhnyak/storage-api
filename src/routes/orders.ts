import express from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import OrderItem from "../models/OrderItem";

const router = express.Router();

// Отримати всі замовлення
router.get("/", async (_, res) => {
  const orders = await Order.findAll({
    include: [
      {
        model: Product,
        as: "products",
        through: { attributes: ["quantity"] }, // показує кількість у зв’язку
      },
    ],
  });
  res.json(orders);
});

// Створити замовлення
router.post("/", async (req, res) => {
  const { customerName, items } = req.body;
  // items = [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 5 }]

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Order must contain at least one product" });
  }

  const order = await Order.create({ customerName });

  for (const item of items) {
    const product = await Product.findByPk(item.productId);
    if (!product) continue;

    // if (product.stock < item.quantity) {
    //   return res
    //     .status(400)
    //     .json({ message: `Not enough stock for product ${product.name}` });
    // }

    // зменшити залишки
    // product.stock -= item.quantity;
    // await product.save();

    // запис у проміжну таблицю
    await OrderItem.create({
      orderId: order.id,
      productId: product.id,
      quantity: item.quantity,
    });
  }

  const orderWithProducts = await Order.findByPk(order.id, {
    include: [
      { model: Product, as: "products", through: { attributes: ["quantity"] } },
    ],
  });

  res.status(201).json(orderWithProducts);
});

export default router;
