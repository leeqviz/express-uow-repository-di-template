import { NotFoundError } from "../../utils/errors.js";

// business logic
export class UsersService {
  constructor(usersRepository, getUserAnalyticsQuery, uow) {
    this.usersRepository = usersRepository;
    this.getUserAnalyticsQuery = getUserAnalyticsQuery;
    this.uow = uow;
  }

  async refillWallet(userId, amount) {
    return await this.uow.runInTransaction(async () => {
      const updatedUser = await this.usersRepository.updateBalance(
        userId,
        amount,
      );
      if (!updatedUser)
        throw new NotFoundError(`User was not found by ID ${userId}`);

      await this.usersRepository.logTransaction(userId, amount);
      return updatedUser;
    });
  }

  async getUserAnalytics(userId) {
    const report = await this.getUserAnalyticsQuery.execute({ userId });
    if (!report)
      throw new NotFoundError(`Analytics for user ${userId} is empty`);
    return report;
  }
}
