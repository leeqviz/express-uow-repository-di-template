import sql from "mssql";

const config = {
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  server: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "database",
  port: parseInt(process.env.DB_PORT || "1433"),
  options: { encrypt: true, trustServerCertificate: true },
  pool: { max: 10, min: 2, idleTimeoutMillis: 30000 },
};

/** @type {sql.ConnectionPool | null} */
let pool = null;

export async function initPool() {
  try {
    pool = await new sql.ConnectionPool(config).connect();
    console.log("DB Connection Pool initialized");
    return pool;
  } catch (error) {
    console.error("Error initializing DB Connection Pool: ", error);
    process.exit(1);
  }
}

export function getPool() {
  if (!pool) throw new Error("DB Connection Pool is not initialized");
  return pool;
}
