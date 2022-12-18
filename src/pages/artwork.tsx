import BackArrow from "../components/BackArrow";
import Footer from "../components/Footer";
import ArtItem from "../components/ArtItem";
import type { Artwork, RawArtwork } from "../types/Artwork";

import Head from "next/head";

import { v4 as uuidv4 } from "uuid";

export default function ArtWork({ items }: { items: RawArtwork[] }) {
    const handleDescription = (d?: string | string[]): string => {
        const s = d ?? "";
        return typeof s === "string" ? s : s.join(" ");
    }

    const works: Artwork[] = items.map(item => {return {
        date: new Date(item.date),
        description: handleDescription(item.description),
        links: item.links,
    }});

  	return (
        <>
            <Head>
                <title>artwork</title>
            </Head>
            <div className="site-body">
                <BackArrow/>
                <div className="intro">
                    <span>stuff that i made</span>
                </div>
                <div className="notes artwork">
                    {works.map(w => (
                        <li key={uuidv4()}>
                            <ArtItem date={w.date} description={w.description} links={w.links}/>
                        </li>
                    ))}
                </div>
                <Footer/>
            </div>
        </>
  	);
}

export async function getStaticProps() {
    const req = await fetch("http://localhost:3000/data/artwork.json");
    const items: RawArtwork[] = await req.json();

    return {
        props: { items },
        revalidate: 15,
    }
}
