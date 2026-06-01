import express from "express";
import { initPool } from "./config/database.js";

const app = express();
app.use(express.json());

async function startServer() {
  await initPool();

  const { default: usersRoutes } =
    await import("./modules/users/users.routes.js");
  app.use("/api/users", usersRoutes);

  const { errorMiddleware } = await import("./middlewares/error.middleware.js");
  app.use(errorMiddleware);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

startServer();
