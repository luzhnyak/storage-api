import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface WarehouseAttributes {
  id: number;
  name: string;
  location?: string;
}

interface WarehouseCreationAttributes
  extends Optional<WarehouseAttributes, "id" | "location"> {}

class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  public id!: number;
  public name!: string;
  public location?: string;
}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(150), allowNull: false },
    location: { type: DataTypes.STRING(255), allowNull: true },
  },
  { sequelize, tableName: "warehouses" }
);

export default Warehouse;
