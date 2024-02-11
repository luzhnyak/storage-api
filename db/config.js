const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "luzhnyak_store",
  username: "luzhnyak_store",
  password: "aGEGloy2Su",
  host: "goldfishnet.in.ua",
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
