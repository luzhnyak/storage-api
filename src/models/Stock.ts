import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface StockAttributes {
  id: number;
  warehouseId: number;
  productId: number;
  quantity: number;
}

interface StockCreationAttributes
  extends Optional<StockAttributes, "id" | "quantity"> {}

class Stock
  extends Model<StockAttributes, StockCreationAttributes>
  implements StockAttributes
{
  public id!: number;
  public warehouseId!: number;
  public productId!: number;
  public quantity!: number;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    warehouseId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  },
  { sequelize, tableName: "stock" }
);

export default Stock;
