import { AsyncLocalStorage } from "async_hooks";
import sql from "mssql";

export class UnitOfWork {
  /** @param {sql.ConnectionPool} pool */
  constructor(pool) {
    this.pool = pool;
    this.storage = new AsyncLocalStorage();
  }

  /** @param {Function} fn */
  async runInTransaction(fn) {
    const transaction = new sql.Transaction(this.pool);
    try {
      await transaction.begin();

      const result = await this.storage.run(transaction, async () => {
        return await fn();
      });

      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  getContext() {
    return this.storage.getStore() || this.pool;
  }
}
