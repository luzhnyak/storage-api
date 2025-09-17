import { Request, Response } from "express";

import Product from "../models/Product";
import { HttpError, ctrlWrapper } from "../helpers";
// import { refreshSumTransaction } from "../services/transactions";
import Transaction from "../models/Transaction";
import TransactionItem from "../models/TransactionItem";

// ============================== Get All

const getAllTransactions = async (req: Request, res: Response) => {
  const transaction = await Transaction.findAll();

  if (!transaction) {
    throw new HttpError(404, "Not found");
  }

  res.json(transaction);
};

// ============================== Get by ID

const getTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const transaction = await Transaction.findByPk(id);
  console.log(transaction);

  if (!transaction) {
    throw new HttpError(404, "Not found");
  }

  const transactionItems = await TransactionItem.findAll({
    where: { transactionId: id },
  });

  const fullTransactionProducts = await Promise.all(
    transactionItems.map(async ({ id, productId, transactionId, quantity }) => {
      const product = await Product.findByPk(productId);
      return {
        id,
        name: product?.name || "",
        transactionId,
        productId,
        quantity,
        // price,
      };
    })
  );

  const data = {
    ...transaction.toJSON(),

    transaction_products: fullTransactionProducts,
  };

  res.json(data);
};

// ============================== Add transaction

const addTransaction = async (req: Request, res: Response) => {
  const transaction = await Transaction.create({ ...req.body, suma: 0 });

  res.status(201).json(transaction);
};

// ============================== Add product to transaction

const addProductToTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  let transactionProduct = await TransactionItem.findOne({
    where: {
      transactionId: id,
      productId: req.body.productId,
    },
  });

  if (transactionProduct) {
    await TransactionItem.update(
      {
        quantity: Number(req.body.quantity),
        // price: Number(req.body.price),
      },
      {
        where: {
          id: transactionProduct.id,
        },
      }
    );

    transactionProduct = await TransactionItem.findByPk(transactionProduct.id);
  } else {
    transactionProduct = await TransactionItem.create({
      transactionId: id,
      ...req.body,
    });
  }

  // if (id) refreshSumTransaction(parseInt(id));

  if (!transactionProduct) {
    throw new HttpError(404, "Not found");
  }

  const product = await Product.findByPk(transactionProduct.productId);

  res.status(201).json({
    id,
    name: product?.name || "",
    transactionId: transactionProduct.transactionId,
    productId: transactionProduct.productId,
    quantity: transactionProduct.quantity,
    // price: transactionProduct.price,
  });
};

// ============================== Delete transaction

const removeTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  const transactionProducts = await TransactionItem.findAll({
    where: {
      transactionId: id,
    },
  });

  transactionProducts.forEach(async (product) => {
    await TransactionItem.destroy({
      where: {
        id: product.id,
      },
    });
  });

  const result = await Transaction.destroy({
    where: {
      id: id,
    },
  });

  if (result <= 0) {
    throw new HttpError(404, "Not found");
  }

  res.json({ message: "Transaction deleted" });
};

// ============================== Delete product in transaction

const removeProductInTransaction = async (req: Request, res: Response) => {
  const { id, productId } = req.params;

  const result = await TransactionItem.destroy({
    where: {
      transactionId: id,
      productId: productId,
    },
  });

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  // if (id) refreshSumTransaction(parseInt(id));

  res.json({ message: "Product in transaction deleted" });
};

// ============================== Update transaction

const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Transaction.update(req.body, {
    where: {
      id,
    },
  });

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  const transaction = await Transaction.findByPk(id);

  res.json(transaction);
};

// ============================== Update product in Transaction

const updateProductInTransaction = async (req: Request, res: Response) => {
  const { id, productId } = req.params;

  console.log(req.body);

  const result = await TransactionItem.update(req.body, {
    where: {
      transactionId: id,
      productId: productId,
    },
  });

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  // if (id) refreshSumTransaction(parseInt(id));

  const updatedProduct = await TransactionItem.findOne({
    where: {
      transactionId: id,
      productId: productId,
    },
  });

  res.json(updatedProduct);
};

export default {
  getAllTransactions: ctrlWrapper(getAllTransactions),
  getTransactionById: ctrlWrapper(getTransactionById),
  addTransaction: ctrlWrapper(addTransaction),
  removeTransaction: ctrlWrapper(removeTransaction),
  updateTransaction: ctrlWrapper(updateTransaction),
  addProductToTransaction: ctrlWrapper(addProductToTransaction),
  updateProductInTransaction: ctrlWrapper(updateProductInTransaction),
  removeProductInTransaction: ctrlWrapper(removeProductInTransaction),
};
