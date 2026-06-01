export class GetUserAnalyticsQuery {
  constructor(uow) {
    this.uow = uow;
  }

  async execute({ userId }) {
    const context = this.uow.getContext();
    const result = await context.request().input("userId", userId).query(`
        SELECT u.id, COUNT(l.id) as total_operations 
        FROM Users u 
        LEFT JOIN WalletLogs l ON u.id = l.user_id 
        WHERE u.id = @userId 
        GROUP BY u.id
      `);
    return result.recordset || null;
  }
}
