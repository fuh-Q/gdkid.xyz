import type { Note } from "../types/Note";
import { toHTML } from "discord-markdown";

import formatDate from "../utils/time";

export default function NoteItem({ id, timestamp, note }: Note) {
    const formatted = formatDate(timestamp);

    return (
        <>
            <hr className="separator"/>
            <div id={`${id}`} className="note">
                <div className="timestamp">
                    {formatted}
                    <span className="inline-note-id"><i>{`# ${id}`}</i></span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: toHTML(note) }}/>
            </div>
        </>
    );
}
