const app = require("./app");
// const sqlite3 = require("sqlite3").verbose();

const DB_HOST = "./db/data.db";

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: DB_HOST,
  },
  useNullAsDefault: true,
});

app.listen(3000);

module.exports = knex;
