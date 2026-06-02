// db repository
export class UsersRepository {
  constructor(uow) {
    this.uow = uow;
  }

  async updateBalance(userId, amount) {
    const context = this.uow.getContext();
    const result = await context
      .request()
      .input("id", userId)
      .input("amount", amount)
      .query(
        "UPDATE Users SET balance = balance + @amount OUTPUT inserted.* WHERE id = @id",
      );
    return result.recordset || null;
  }

  async logTransaction(userId, amount) {
    const context = this.uow.getContext();
    await context
      .request()
      .input("userId", userId)
      .input("amount", amount)
      .query(
        "INSERT INTO WalletLogs (user_id, amount, created_at) VALUES (@userId, @amount, GETDATE())",
      );
  }
}
