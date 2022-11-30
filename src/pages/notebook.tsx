import BackArrow from "../components/BackArrow";
import Footer from "../components/Footer";

import NoteItem from "../components/NoteItem";
import type { RawNote, Note } from "../types/Note";

import Head from "next/head";

export default function NoteBook({ rawRows }: { rawRows: RawNote[] }) {
    const rows: Note[] = rawRows.map(row => {return {
        id: row.id,
        timestamp: new Date(row.timestamp),
        note: row.note
    }});

    return (
        <>
            <Head>
                <title>thought dump</title>
            </Head>
            <div className="site-body">
                <BackArrow/>
                <div className="intro">
                    <span>notes & thought dump</span>
                </div>
                <div className="notes">
                    {rows.map(r => {return(
                        <li key={r.id}>
                            <NoteItem id={r.id} timestamp={r.timestamp} note={r.note}/>
                        </li>
                    )})}
                </div>
                <Footer/>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const req = await fetch("http://localhost:3000/api/notes");
    const rawRows: RawNote[] = await req.json();

    return {
        props: { rawRows },
        revalidate: 15,
    }
}
