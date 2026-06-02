import express from "express";
import { initPool } from "./config/database.js";

const app = express();
app.use(express.json());

async function startServer() {
  // init db connection
  await initPool();

  // apply routes
  const { default: usersRoutes } =
    await import("./modules/users/users.routes.js");
  app.use("/api/users", usersRoutes);

  // apply global middleware
  const { errorMiddleware } = await import("./middlewares/error.middleware.js");
  app.use(errorMiddleware);

  // start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

startServer();
