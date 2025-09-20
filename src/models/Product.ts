import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface ProductAttributes {
  id: number;
  name: string;
  sku?: string;
  description?: string;
  unit: string;
  imageUrl?: string;
  price: number;
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
  public imageUrl?: string;
  public price!: number;
  public categoryId?: number;
  public brandId?: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(200), allowNull: false },
    sku: { type: DataTypes.STRING(100), unique: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    unit: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "шт." },
    imageUrl: { type: DataTypes.STRING(200), allowNull: true },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    categoryId: { type: DataTypes.INTEGER, allowNull: true },
    brandId: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, tableName: "products" }
);

export default Product;
