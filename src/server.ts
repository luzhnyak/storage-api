import express from "express";
import { sequelize } from "./db";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

const PORT = 3000;

async function start() {
  await sequelize.sync({ alter: true });
  console.log("Database synced");
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
}

start();
