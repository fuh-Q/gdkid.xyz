import type { Artwork } from "../types/Artwork";
import { toHTML } from "discord-markdown";

import { MONTHS } from "../utils/time";

export default function ArtItem({ date, description, links }: Artwork) {
    description = toHTML(description, { escapeHTML: false }) + "<br/>";
    links.map((link) => (description += `<br/><br/><img alt='image' src='${link}'/>`));
    const formatted = `${MONTHS[date.getUTCMonth()].slice(0, 3)}. ${date.getUTCDate()} ${date.getUTCFullYear()}`;

    return (
        <>
            <hr className="separator" />
            <div className="note art">
                <div className="timestamp">{formatted}</div>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </>
    );
}
