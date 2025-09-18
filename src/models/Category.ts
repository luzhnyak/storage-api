import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface CategoryAttributes {
  id: number;
  name: string;
  description?: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id" | "description"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(128), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: "categories" }
);

export default Category;
