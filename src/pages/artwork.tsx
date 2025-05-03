import type Artwork from "../types/Artwork";
import Metadata from "../components/Metadata";
import { SitePage } from "../components/SitePage";
import items from "../../public/data/artwork.json" assert { type: "json" };

import { toHTML } from "discord-markdown";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

function deserializeArtworks(): Artwork[] {
    const handleDescription = (d?: string | string[]): string => {
        const s = d ?? "";
        return typeof s === "string" ? s : s.join(" ");
    };

    return items.map((item) => {
        return {
            date: item.date,
            description: handleDescription(item.description),
            links: item.links,
        };
    });
}

function ArtItem({ date, description, links }: Artwork) {
    description = toHTML(description, { escapeHTML: false }) + "<br/>";
    links.map((link) => (description += `<br/><br/><img alt='image' src='${link}'/>`));

    return (
        <>
            <hr className="separator" />
            <div className="note art">
                <div className="timestamp">{date}</div>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </>
    );
}

export default function ArtWork() {
    const works = deserializeArtworks();

    return (
        <>
            <Metadata title="artwork" ogDescription="things i take pride in" />

            <SitePage className="notes artwork" pageName="stuff that i made">
                {works.map((w) => (
                    <li key={uuidv4()}>
                        <ArtItem date={w.date} description={w.description} links={w.links} />
                    </li>
                ))}
            </SitePage>
        </>
    );
}
