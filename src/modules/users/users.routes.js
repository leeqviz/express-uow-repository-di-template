import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { usersController } from "./users.container.js";
import { getAnalyticsSchema, refillWalletSchema } from "./users.schemas.js";

const router = Router();

router.post(
  "/:id/refill",
  validate(refillWalletSchema),
  usersController.refill,
);
router.get(
  "/:id/analytics",
  validate(getAnalyticsSchema),
  usersController.getAnalytics,
);

export default router;
