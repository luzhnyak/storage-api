import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface BrandAttributes {
  id: number;
  name: string;
  image: string;
}

interface BrandCreationAttributes extends Optional<BrandAttributes, "id"> {}

class Brand
  extends Model<BrandAttributes, BrandCreationAttributes>
  implements BrandAttributes
{
  public id!: number;
  public name!: string;
  public image!: string;
}

Brand.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(128), allowNull: false },
    image: { type: DataTypes.STRING(128), allowNull: true },
  },
  { sequelize, tableName: "brands" }
);

export default Brand;
