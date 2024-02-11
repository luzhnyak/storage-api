const { HttpError, ctrlWrapper } = require("../helpers");

const Product = require("../db/models/product");
const Order = require("../db/models/order");
const OrderProduct = require("../db/models/orderProduct");

// ============================== Get All

const getAllOrders = async (req, res) => {
  const order = await Order.findAll();

  if (!order) {
    throw HttpError(404, "Not found");
  }

  res.json(order);
};

// ============================== Get by ID

const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);

  if (!order) {
    throw HttpError(404, "Not found");
  }

  const orderProducts = await OrderProduct.findAll({
    where: { order_id: id },
  });

  const fullOrderProducts = await Promise.all(
    orderProducts.map(async ({ product_id, order_id, quantity, price }) => {
      const product = await Product.findByPk(product_id);
      return { name: product.name, order_id, product_id, quantity, price };
    })
  );

  const suma = orderProducts.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  const data = {
    ...order.toJSON(),
    suma: suma,
    order_products: fullOrderProducts,
  };

  res.json(data);
};

// ============================== Add order

const addOrder = async (req, res) => {
  const order = await Order.create(req.body);

  res.status(201).json(order);
};

// ============================== Add product to order

const addProductToOrder = async (req, res) => {
  const { id } = req.params;

  let orderProduct = await OrderProduct.findOne({
    where: {
      order_id: id,
      product_id: req.body.product_id,
    },
  });

  if (orderProduct) {
    await OrderProduct.update(
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

    orderProduct = await OrderProduct.findByPk(orderProduct.id);
  } else {
    orderProduct = await OrderProduct.create({
      order_id: id,
      ...req.body,
    });
  }

  const orderProducts = await OrderProduct.findAll({
    where: {
      order_id: id,
    },
  });

  const suma = orderProducts.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  await Order.update(
    {
      suma: suma,
      date_modified: Date.now(),
    },
    {
      where: {
        id,
      },
    }
  );

  res.status(201).json(orderProduct);
};

// ============================== Delete order

const removeOrder = async (req, res) => {
  const { id } = req.params;

  const orderProducts = await OrderProduct.findAll({
    where: {
      order_id: id,
    },
  });

  orderProducts.forEach(async (product) => {
    await OrderProduct.destroy({
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
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Order deleted" });
};

// ============================== Delete product in order

const removeProductInOrder = async (req, res) => {
  const { orderId, productId } = req.params;
  const orderProduct = await knex("order_products")
    .where("order_id", orderId)
    .where("product_id", productId)
    .del();

  if (!orderProduct) {
    throw HttpError(404, "Not found");
  }

  await knex("orders")
    .where("id", orderId)
    .update({ date_modified: Date.now() });

  res.json({ message: "Product in order deleted" });
};

// ============================== Update order

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await knex("orders")
    .where("id", orderId)
    .update({ date_modified: Date.now(), ...req.body });

  if (!order) {
    throw HttpError(404, "Not found");
  }

  const updatedOrder = await knex("order").where("id", orderId).first();

  res.json(updatedOrder);
};

// ============================== Update product in Order

const updateProductInOrder = async (req, res) => {
  const { orderId, productId } = req.params;
  const orderProduct = await knex("order_products")
    .where("order_id", orderId)
    .where("product_id", productId)
    .update(req.body);

  console.log(orderProduct);
  if (!orderProduct) {
    throw HttpError(404, "Not found");
  }

  const updatedProduct = await knex("order_products")
    .where("order_id", orderId)
    .where("product_id", productId)
    .first();

  await knex("orders")
    .where("id", orderId)
    .update({ date_modified: Date.now() });

  res.json(updatedProduct);
};

module.exports = {
  getAllOrders: ctrlWrapper(getAllOrders),
  getOrderById: ctrlWrapper(getOrderById),
  addOrder: ctrlWrapper(addOrder),
  removeOrder: ctrlWrapper(removeOrder),
  updateOrder: ctrlWrapper(updateOrder),
  addProductToOrder: ctrlWrapper(addProductToOrder),
  updateProductInOrder: ctrlWrapper(updateProductInOrder),
  removeProductInOrder: ctrlWrapper(removeProductInOrder),
};
