import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface CustomerAttributes {
  id: number;
  name: string;
  contactInfo?: string;
}

interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "id" | "contactInfo"> {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
  public contactInfo?: string;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(200), allowNull: false },
    contactInfo: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: "customers" }
);

export default Customer;
