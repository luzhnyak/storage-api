import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

export type TransactionType =
  | "purchase"
  | "sale"
  | "transfer"
  | "return_to_supplier"
  | "return_from_customer";
export type TransactionStatus = "draft" | "confirmed";

interface TransactionAttributes {
  id: number;
  type: TransactionType;
  status: TransactionStatus;
  warehouseFromId?: number;
  warehouseToId?: number;
  supplierId?: number;
  customerId?: number;
  userId?: number;
}

interface TransactionCreationAttributes
  extends Optional<
    TransactionAttributes,
    | "id"
    | "status"
    | "warehouseFromId"
    | "warehouseToId"
    | "supplierId"
    | "customerId"
    | "userId"
  > {}

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number;
  public type!: TransactionType;
  public status!: TransactionStatus;
  public warehouseFromId?: number;
  public warehouseToId?: number;
  public supplierId?: number;
  public customerId?: number;
  public userId?: number;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(
        "purchase",
        "sale",
        "transfer",
        "return_to_supplier",
        "return_from_customer"
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("draft", "confirmed"),
      defaultValue: "draft",
    },
    warehouseFromId: { type: DataTypes.INTEGER, allowNull: true },
    warehouseToId: { type: DataTypes.INTEGER, allowNull: true },
    supplierId: { type: DataTypes.INTEGER, allowNull: true },
    customerId: { type: DataTypes.INTEGER, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, tableName: "transactions" }
);

export default Transaction;
