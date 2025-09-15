import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";
import Brand from "./Brand";
import Category from "./Category";

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  brandId?: number;
  categoryId?: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public brandId?: number;
  public categoryId?: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(128), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, tableName: "products" }
);

Product.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export default Product;
