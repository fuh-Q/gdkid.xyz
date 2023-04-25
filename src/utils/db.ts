import { config as load_config } from "dotenv";
import { Pool } from "pg";

load_config();
export default new Pool({
    connectionString: process.env.DB_URI,
    min: 0,
    max: 5,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 5000,
});
