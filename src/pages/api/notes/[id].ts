import type { RawNote } from "../../../types/Note";
import type { NextApiRequest, NextApiResponse } from "next";

import { getNotes, limiter } from ".";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<string | RawNote>
) {
	if (limiter.isRateLimited(req)) {
		return res.status(429).send("too many requests");
	}

	if (req.method !== "GET") {
		return res.status(405).send("method not allowed");
	}

    const { id } = req.query;
    const noteId = Number.parseInt(id as string);
    if (isNaN(noteId)) { return res.status(400).send("NaN"); }

	const data = await getNotes(noteId);
	return res.status(200).json(data.rows[0] || {});
}
