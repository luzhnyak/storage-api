import User from "./User";
import Warehouse from "./Warehouse";
import Category from "./Category";
import Product from "./Product";
import Supplier from "./Supplier";
import Customer from "./Customer";
import Stock from "./Stock";
import Transaction from "./Transaction";
import TransactionItem from "./TransactionItem";

export function initAssociations() {
  // ---------------- User
  User.hasMany(Transaction, { foreignKey: "userId" });
  Transaction.belongsTo(User, { foreignKey: "userId" });

  // ---------------- Warehouse
  Warehouse.hasMany(Stock, { foreignKey: "warehouseId" });
  Stock.belongsTo(Warehouse, { foreignKey: "warehouseId" });

  Warehouse.hasMany(Transaction, {
    foreignKey: "warehouseFromId",
    as: "outgoingTransactions",
  });
  Warehouse.hasMany(Transaction, {
    foreignKey: "warehouseToId",
    as: "incomingTransactions",
  });
  Transaction.belongsTo(Warehouse, {
    foreignKey: "warehouseFromId",
    as: "warehouseFrom",
  });
  Transaction.belongsTo(Warehouse, {
    foreignKey: "warehouseToId",
    as: "warehouseTo",
  });

  // ---------------- Category
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category, { foreignKey: "categoryId" });

  // ---------------- Product
  Product.hasMany(Stock, { foreignKey: "productId" });
  Stock.belongsTo(Product, { foreignKey: "productId" });

  Product.hasMany(TransactionItem, { foreignKey: "productId" });
  TransactionItem.belongsTo(Product, { foreignKey: "productId" });

  // ---------------- Supplier
  Supplier.hasMany(Transaction, { foreignKey: "supplierId" });
  Transaction.belongsTo(Supplier, { foreignKey: "supplierId" });

  // ----------------- Customer
  Customer.hasMany(Transaction, { foreignKey: "customerId" });
  Transaction.belongsTo(Customer, { foreignKey: "customerId" });

  // ---------------- Transaction
  Transaction.hasMany(TransactionItem, { foreignKey: "transactionId" });
  TransactionItem.belongsTo(Transaction, { foreignKey: "transactionId" });
}
