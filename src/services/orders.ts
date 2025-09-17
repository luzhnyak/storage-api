import Transaction from "../models/Transaction";
import TransactionItem from "../models/TransactionItem";

export const refreshSumTransaction = async (TransactionId: number) => {
  const transaction = await Transaction.findByPk(TransactionId);

  if (!transaction) return;

  const TransactionProducts = await TransactionItem.findAll({
    where: {
      transactionId: TransactionId,
    },
  });

  const sum = TransactionProducts.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  await Transaction.update(
    {
      suma: sum,
    },
    {
      where: {
        id: TransactionId,
      },
    }
  );
};
