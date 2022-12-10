import type { RawNote } from "../../types/Note";
import type { NextApiRequest, NextApiResponse } from "next";

import LockoutLimiter from "../../utils/limiter";

import { Pool } from "pg";
import { config } from "dotenv";

config();
const pool = new Pool({
    connectionString: process.env.DB_URI,
    min: 0,
    max: 5,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 5000,
});

const limiter = new LockoutLimiter({
	rate: 3,
	per: 2,
	keyGen: (r: NextApiRequest) => r.socket.remoteAddress || "",
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<string | RawNote[]>
) {
	if (limiter.isRateLimited(req)) {
		return res.status(429).send("too many requests");
	}
	if (req.method !== "GET") {
		return res.status(405).send("method not allowed");
	}

	const query = `SELECT * FROM notes ORDER BY id DESC`;
	const conn = await pool.connect();
	const data = await conn.query<RawNote>(query);
	conn.release();

	return res.status(200).json(data.rows);
}
