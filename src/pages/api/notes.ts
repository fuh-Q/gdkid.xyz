import type { RawNote } from "../../types/Note";
import type { NextApiRequest, NextApiResponse } from "next";

import { getNewDefaultLimiter } from "../../utils/limiter";

import pool from "../../utils/db";
const limiter = getNewDefaultLimiter();

export default async function handler(req: NextApiRequest, res: NextApiResponse<string | RawNote[]>) {
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
