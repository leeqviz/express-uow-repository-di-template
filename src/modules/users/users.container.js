import { getPool } from "../../config/database.js";
import { autoCatch } from "../../utils/auto-catch.js";
import { UnitOfWork } from "../../utils/unit-of-work.js";
import { GetUserAnalyticsQuery } from "./queries/get-user-analytics.query.js";
import { UsersController } from "./users.controller.js";
import { UsersRepository } from "./users.repository.js";
import { UsersService } from "./users.service.js";

const pool = getPool();
const uow = new UnitOfWork(pool);
const usersRepository = new UsersRepository(uow);
const getUserAnalyticsQuery = new GetUserAnalyticsQuery(uow);
const usersService = new UsersService(
  usersRepository,
  getUserAnalyticsQuery,
  uow,
);

export const usersController = autoCatch(new UsersController(usersService));
