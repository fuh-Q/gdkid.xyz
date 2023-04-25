import Metadata from "../components/Metadata";
import NoteItem from "../components/NoteItem";
import SimplePage from "../components/SimplePage";
import SitePage from "../components/SitePage";
import type { RawNote, Note } from "../types/Note";

import { useEffect } from "react";
import type { GetServerSidePropsContext } from "next";

import { getNewDefaultLimiter } from "../utils/limiter";
import pool from "../utils/db";
const limiter = getNewDefaultLimiter();

function deserializeNotes(raw: RawNote[]): Note[] {
    return raw.map((row) => {
        return {
            id: row.id,
            timestamp: new Date(row.timestamp),
            note: row.note,
        };
    });
}

function urlHashHandler() {
    const noteId = new URL(window.location.href).hash.slice(1);
    if (!noteId) return;

    const elem = document.getElementById(noteId);
    if (!elem) return;
    elem.classList.add("flash");
    setTimeout(() => {
        const spoof = document.getElementById("" + (Number.parseInt(noteId) + 3));
        if (spoof) spoof.scrollIntoView();
        else window.scrollTo(0, 0);
    });
}

export default function NoteBook({ rawRows }: { rawRows: RawNote[] | null }) {
    useEffect(urlHashHandler, []);

    if (!rawRows) {
        return <SimplePage msg="stop spamming lol" head="🛑" />;
    }

    const rows = deserializeNotes(rawRows);

    return (
        <>
            <Metadata title="thought dump" ogDescription="thoughts and out of context notes" />

            <SitePage className="notes" pageName="notes & thought dump" backTo="/idk">
                {rows.map((r) => (
                    <li key={r.id}>
                        <NoteItem id={r.id} timestamp={r.timestamp} includeTime={true} note={r.note} />
                    </li>
                ))}
            </SitePage>
        </>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    let rows: Note[] | null;
    if (limiter.isRateLimited(ctx.req)) {
        return { props: { rawRows: null } };
    }

    const query = "SELECT * FROM notes ORDER BY id DESC";
    const conn = await pool.connect();
    rows = (await conn.query<Note>(query)).rows;
    conn.release();

    const rawRows = JSON.parse(JSON.stringify(rows));
    return { props: { rawRows } };
}
