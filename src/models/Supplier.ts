import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface SupplierAttributes {
  id: number;
  name: string;
  contactInfo?: string;
}

interface SupplierCreationAttributes
  extends Optional<SupplierAttributes, "id" | "contactInfo"> {}

class Supplier
  extends Model<SupplierAttributes, SupplierCreationAttributes>
  implements SupplierAttributes
{
  public id!: number;
  public name!: string;
  public contactInfo?: string;
}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(200), allowNull: false },
    contactInfo: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: "suppliers" }
);

export default Supplier;
