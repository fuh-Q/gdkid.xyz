import type { Scream } from "../../types/ScreamCalendar";
import { getNewDefaultLimiter } from "../../utils/limiter";

import type { NextApiRequest, NextApiResponse } from "next";

import pool from "../../utils/db";
const limiter = getNewDefaultLimiter(),
    isNaN = Number.isNaN,
    parseInt = Number.parseInt;

export default async function handler(req: NextApiRequest, res: NextApiResponse<string | Scream[]>) {
    if (limiter.isRateLimited(req)) {
        return res.status(429).send("too many requests");
    }
    if (req.method !== "GET") {
        return res.status(405).send("method not allowed");
    }

    const thisYear = new Date().getFullYear();
    const arg = !req.query["year"] || typeof req.query["year"] !== "string" ? thisYear : parseInt(req.query["year"]);

    const query = "SELECT * FROM screamdates WHERE EXTRACT(YEAR FROM day) = $1";
    const conn = await pool.connect();
    const data = await conn.query<Scream>(query, [isNaN(arg) ? thisYear : arg]);
    conn.release();

    return res.status(200).json(data.rows);
}
