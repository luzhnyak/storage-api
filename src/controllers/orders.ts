import { Request, Response } from "express";

import Order from "../models/Order";
import Product from "../models/Product";
import OrderItem from "../models/OrderItem";
import { HttpError, ctrlWrapper } from "../helpers";
import { refreshSumOrder } from "../services/orders";

// ============================== Get All

const getAllOrders = async (req: Request, res: Response) => {
  const order = await Order.findAll();

  if (!order) {
    throw new HttpError(404, "Not found");
  }

  res.json(order);
};

// ============================== Get by ID

const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);

  if (!order) {
    throw new HttpError(404, "Not found");
  }

  const orderItems = await OrderItem.findAll({
    where: { orderId: id },
  });

  const fullOrderProducts = await Promise.all(
    orderItems.map(async ({ id, productId, orderId, quantity, price }) => {
      const product = await Product.findByPk(productId);
      return {
        id,
        name: product?.name || "",
        orderId,
        productId,
        quantity,
        price,
      };
    })
  );

  const data = {
    ...order.toJSON(),

    order_products: fullOrderProducts,
  };

  res.json(data);
};

// ============================== Add order

const addOrder = async (req: Request, res: Response) => {
  const order = await Order.create({ ...req.body, suma: 0 });

  res.status(201).json(order);
};

// ============================== Add product to order

const addProductToOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  let orderProduct = await OrderItem.findOne({
    where: {
      orderId: id,
      productId: req.body.productId,
    },
  });

  if (orderProduct) {
    await OrderItem.update(
      {
        quantity: Number(req.body.quantity),
        price: Number(req.body.price),
      },
      {
        where: {
          id: orderProduct.id,
        },
      }
    );

    orderProduct = await OrderItem.findByPk(orderProduct.id);
  } else {
    orderProduct = await OrderItem.create({
      orderId: id,
      ...req.body,
    });
  }

  if (id) refreshSumOrder(parseInt(id));

  if (!orderProduct) {
    throw new HttpError(404, "Not found");
  }

  const product = await Product.findByPk(orderProduct.productId);

  res.status(201).json({
    id,
    name: product?.name || "",
    orderId: orderProduct.orderId,
    productId: orderProduct.productId,
    quantity: orderProduct.quantity,
    price: orderProduct.price,
  });
};

// ============================== Delete order

const removeOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const orderProducts = await OrderItem.findAll({
    where: {
      orderId: id,
    },
  });

  orderProducts.forEach(async (product) => {
    await OrderItem.destroy({
      where: {
        id: product.id,
      },
    });
  });

  const result = await Order.destroy({
    where: {
      id: id,
    },
  });

  if (result <= 0) {
    throw new HttpError(404, "Not found");
  }

  res.json({ message: "Order deleted" });
};

// ============================== Delete product in order

const removeProductInOrder = async (req: Request, res: Response) => {
  const { id, productId } = req.params;

  const result = await OrderItem.destroy({
    where: {
      orderId: id,
      productId: productId,
    },
  });

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  if (id) refreshSumOrder(parseInt(id));

  res.json({ message: "Product in order deleted" });
};

// ============================== Update order

const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Order.update(req.body, {
    where: {
      id,
    },
  });

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  const order = await Order.findByPk(id);

  res.json(order);
};

// ============================== Update product in Order

const updateProductInOrder = async (req: Request, res: Response) => {
  const { id, productId } = req.params;

  console.log(req.body);

  const result = await OrderItem.update(req.body, {
    where: {
      orderId: id,
      productId: productId,
    },
  });

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  if (id) refreshSumOrder(parseInt(id));

  const updatedProduct = await OrderItem.findOne({
    where: {
      orderId: id,
      productId: productId,
    },
  });

  res.json(updatedProduct);
};

export default {
  getAllOrders: ctrlWrapper(getAllOrders),
  getOrderById: ctrlWrapper(getOrderById),
  addOrder: ctrlWrapper(addOrder),
  removeOrder: ctrlWrapper(removeOrder),
  updateOrder: ctrlWrapper(updateOrder),
  addProductToOrder: ctrlWrapper(addProductToOrder),
  updateProductInOrder: ctrlWrapper(updateProductInOrder),
  removeProductInOrder: ctrlWrapper(removeProductInOrder),
};
