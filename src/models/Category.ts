import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface CategoryAttributes {
  id: number;
  name: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  },
  { sequelize, tableName: "categories" }
);

export default Category;
