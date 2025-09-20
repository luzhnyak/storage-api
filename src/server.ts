import express from "express";
import fs from "fs";
import path from "path";

import { sequelize } from "./db";
import { initAssociations } from "./models/associations";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// async function runSqlFile(filePath: string) {
//   const sql = fs.readFileSync(filePath, "utf8");
//   const queries = sql
//     .split(";")
//     .map((q) => q.trim())
//     .filter((q) => q.length);

//   for (const query of queries) {
//     await sequelize.query(query);
//   }
// }

async function runSqlFile(filePath: string) {
  const sql = fs.readFileSync(filePath, "utf8");

  const statements: string[] = [];
  let current = "";
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    } else if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
    }

    if (char === ";" && !inSingleQuote && !inDoubleQuote) {
      // завершили запит
      if (current.trim().length > 0) {
        statements.push(current.trim());
      }
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim().length > 0) {
    statements.push(current.trim());
  }

  // Виконуємо всі запити послідовно
  for (const stmt of statements) {
    await sequelize.query(stmt);
  }
}

const loadDataToTable = async (tableName: string) => {
  // 👉 перевіримо чи таблиця пуста таблиця
  const [rows] = await sequelize.query(
    `SELECT COUNT(*) as count FROM ${tableName};`
  );
  const count = (rows as any)[0].count;

  if (count === 0) {
    console.log(`🔄 Виконую ${tableName}.sql...`);
    await runSqlFile(path.join(__dirname, "sql", `${tableName}.sql`));
  }
};

async function start() {
  initAssociations();
  await sequelize.sync({ alter: true });
  console.log("Database synced");

  await loadDataToTable("users");
  await loadDataToTable("brands");
  await loadDataToTable("categories");
  await loadDataToTable("products");

  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
}

start();
