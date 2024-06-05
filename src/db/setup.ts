import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { configDotenv } from "dotenv";
configDotenv();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// export async function verifyConnection() {
//   try {
//     await client.connect(); // Connect the client
//     const result = await client.query("SELECT NOW()");
//     console.log("Connection successful:", result.rows[0]);
//   } catch (error) {
//     console.error("Connection failed:", error);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

export const db = drizzle(pool);
