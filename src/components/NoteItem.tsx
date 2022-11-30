import type { Note } from "../types/Note";
import { marked } from "marked";

import formatDate from "../utils/time";

export default function NoteItem({ id, timestamp, note }: Note) {
    const formatted = formatDate(timestamp);
    const n = note.replaceAll("> -", "> —");

    return (
        <>
            <hr className="separator"/>
            <div id={`note-${id}`} className="note">
                <div className="timestamp">
                    {formatted}
                    <span className="inline-note-id"><i>{`# ${id}`}</i></span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: marked(n, { breaks: true }) }}/>
            </div>
        </>
    )
}
