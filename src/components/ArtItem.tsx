import type { Artwork } from "../types/Artwork";
import { marked } from "marked";

import { MONTHS } from "../utils/time";

export default function ArtItem({ date, description, links }: Artwork) {
    const formatted = `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`;
    let n = description.replaceAll("> -", "> —");

    description += "<br/>";
    links.map(link => n += `<br/><br/>![image](${link})`);

    return (
        <>
            <hr className="separator"/>
            <div className="note art">
                <div className="timestamp">{formatted}</div>
                <div dangerouslySetInnerHTML={{ __html: marked(n, { breaks: true }) }}/>
            </div>
        </>
    )
}
