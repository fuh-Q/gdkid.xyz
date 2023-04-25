import type { Note } from "../types/Note";
import formatDate from "../utils/time";

import { toHTML } from "discord-markdown";
import { v4 as uuidv4 } from "uuid";

export default function NoteItem({ id, timestamp, includeTime, note }: Note) {
    if (!note) {
        return null;
    }

    const formatted = formatDate(timestamp, includeTime);

    return (
        <>
            <hr className="separator" />
            <div id={`${id || undefined}`} className="note">
                <div className="timestamp">
                    {formatted}
                    <span className="inline-note-id">
                        <i>{id ? `# ${id}` : ""}</i>
                    </span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: toHTML(note) }} />
            </div>
        </>
    );
}
