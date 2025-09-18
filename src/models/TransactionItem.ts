import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface TransactionItemAttributes {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

interface TransactionItemCreationAttributes
  extends Optional<TransactionItemAttributes, "id"> {}

class TransactionItem
  extends Model<TransactionItemAttributes, TransactionItemCreationAttributes>
  implements TransactionItemAttributes
{
  public id!: number;
  public transactionId!: number;
  public productId!: number;
  public quantity!: number;
  public unitPrice!: number;
}

TransactionItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transactionId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  },
  { sequelize, tableName: "transaction_items" }
);

export default TransactionItem;
