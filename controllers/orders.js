const { HttpError, ctrlWrapper } = require("../helpers");

const DB_HOST = "./db/data.db";

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: DB_HOST,
  },
  useNullAsDefault: true,
});

// ============================== Get All

const getAllOrders = async (req, res) => {
  const result = await knex("orders").select("*");

  res.json(result);
};

// ============================== Get by ID

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  const order = await knex("orders").where("id", orderId).first();
  const orderProducts = await knex("order_products")
    .where("order_id", orderId)
    .select("*");

  const fullOrderProducts = await Promise.all(
    orderProducts.map(async ({ product_id, order_id, quantity, price }) => {
      const product = await knex("products").where("id", product_id).first();
      return { name: product.name, order_id, product_id, quantity, price };
    })
  );

  const suma = orderProducts.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  if (!order) {
    throw HttpError(404, "Not found");
  }

  const data = { ...order, suma: suma, order_products: fullOrderProducts };

  res.json(data);
};

// ============================== Add order

const addOrder = async (req, res) => {
  const ids = await knex("orders").insert({
    date_added: Date.now(),
    date_modified: Date.now(),
    ...req.body,
  });
  const result = await knex("orders").where("id", ids[0]).first();

  res.status(201).json(result);
};

// ============================== Add product to order

const addProductToOrder = async (req, res) => {
  const { orderId } = req.params;

  const orderProduct = await knex("order_products")
    .where("order_id", orderId)
    .where("product_id", req.body.product_id)
    .first();

  if (orderProduct) {
    throw HttpError(400, "This product is already present in the order");
  }

  const ids = await knex("order_products").insert({
    order_id: orderId,
    ...req.body,
  });

  await knex("orders")
    .where("id", orderId)
    .update({ date_modified: Date.now() });

  const result = await knex("order_products").where("id", ids[0]).first();

  res.status(201).json(result);
};

// ============================== Delete order

const removeOrder = async (req, res) => {
  const { orderId } = req.params;

  const orderProducts = await knex("order_products")
    .where("order_id", orderId)
    .select("*");

  console.log(orderProducts);

  orderProducts.forEach(async (product) => {
    await knex("order_products").where("id", product.id).del();
  });

  const order = await knex("orders").where("id", orderId).del();

  if (!order) {
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
