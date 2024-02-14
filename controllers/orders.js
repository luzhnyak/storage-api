const { HttpError, ctrlWrapper } = require("../helpers");
const sequelize = require("../db/config");

const Product = require("../db/models/product");
const Order = require("../db/models/order");
const OrderProduct = require("../db/models/orderProduct");
const { refreshSumOrder } = require("../db/services/orders");

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
    orderProducts.map(async ({ id, product_id, order_id, quantity, price }) => {
      const product = await Product.findByPk(product_id);
      return { id, name: product.name, order_id, product_id, quantity, price };
    })
  );

  const data = {
    ...order.toJSON(),

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

  refreshSumOrder(id);

  const product = await Product.findByPk(orderProduct.product_id);

  res.status(201).json({
    id,
    name: product.name,
    order_id: orderProduct.order_id,
    product_id: orderProduct.product_id,
    quantity: orderProduct.quantity,
    price: orderProduct.price,
  });
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
  const { id, productId } = req.params;

  const result = await OrderProduct.destroy({
    where: {
      order_id: id,
      product_id: productId,
    },
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  refreshSumOrder(id);

  res.json({ message: "Product in order deleted" });
};

// ============================== Update order

const updateOrder = async (req, res) => {
  const { id } = req.params;

  const result = await Order.update(req.body, {
    where: {
      id,
    },
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  const order = await Order.findByPk(id);

  res.json(order);
};

// ============================== Update product in Order

const updateProductInOrder = async (req, res) => {
  const { id, productId } = req.params;

  console.log(req.body);

  const result = await OrderProduct.update(req.body, {
    where: {
      order_id: id,
      product_id: productId,
    },
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  refreshSumOrder(id);

  const updatedProduct = await OrderProduct.findOne({
    where: {
      order_id: id,
      product_id: productId,
    },
  });

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
