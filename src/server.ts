import express from "express";
import { sequelize } from "./db";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
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
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.sync({ alter: true });
  console.log("Database synced");
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
}

start();
