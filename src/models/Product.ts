import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface ProductAttributes {
  id: number;
  name: string;
  sku?: string;
  description?: string;
  unit: string;
  categoryId?: number;
  brandId?: number;
}

interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    "id" | "categoryId" | "sku" | "description"
  > {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public sku?: string;
  public description?: string;
  public unit!: string;
  public categoryId?: number;
  public brandId?: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(200), allowNull: false },
    sku: { type: DataTypes.STRING(100), unique: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    unit: { type: DataTypes.STRING(50), allowNull: false },
    categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    brandId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  },
  { sequelize, tableName: "products" }
);

export default Product;
