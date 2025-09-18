import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public passwordHash!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "user",
    },
  },
  { sequelize, tableName: "users" }
);

export default User;
