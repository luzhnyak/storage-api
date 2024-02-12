const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  dialect:
    "mariadb" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  dialectOptions: {
    charset: "utf8mb4",
  },
});

// console.log("sequelize", sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

module.exports = sequelize;
