import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface OrderAttributes {
  id: number;
  customerName: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public customerName!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: { type: DataTypes.STRING(128), allowNull: false },
  },
  { sequelize, tableName: "orders" }
);

export default Order;
