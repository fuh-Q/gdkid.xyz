import type { RawNote } from "../../../types/Note";
import type { NextApiRequest, NextApiResponse } from "next";

import LockoutLimiter from "../../../utils/limiter";

import { Pool, QueryResult } from "pg";
import { config } from "dotenv";

config();
export const pool = new Pool({
    connectionString: process.env.DB_URI,
    min: 0,
    max: 5,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 5000,
});

export const limiter = new LockoutLimiter({
	rate: 3,
	per: 2,
	keyGen: (r: NextApiRequest) => r.socket.remoteAddress || "",
})

export async function getNotes(id?: number): Promise<QueryResult<RawNote>> {
    const condition = id ? "WHERE id = $1" : "ORDER BY id DESC"
    const query = `SELECT * FROM notes ${condition}`;
    const conn = await pool.connect();
    const data = await conn.query<RawNote>(query, id ? [id] : []);
    conn.release();

    return data;
}

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

	const data = await getNotes();
	return res.status(200).json(data.rows);
}
