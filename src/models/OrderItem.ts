import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";
import Order from "./Order";
import Product from "./Product";

interface OrderItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, "id"> {}

class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  },
  { sequelize, tableName: "order_items" }
);

// зв’язки
Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: "orderId",
  as: "products",
});
Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "productId",
  as: "orders",
});

export default OrderItem;
