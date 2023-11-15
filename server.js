const app = require("./app");
const sqlite3 = require("sqlite3").verbose();

const DB_HOST = "./db/data.db";

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: DB_HOST,
  },
  useNullAsDefault: true,
});

// const db = new sqlite3.Database(DB_HOST);

// db.serialize(() => {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (let i = 0; i < 10; i++) {
//     stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//     console.log(row.id + ": " + row.info);
//   });
// });

// db.close();

app.listen(3000);

module.exports = knex;
