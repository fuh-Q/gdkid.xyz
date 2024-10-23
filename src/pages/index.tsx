import Footer from "../components/Footer";
import Metadata from "../components/Metadata";
import type LetterProps from "../types/Letter";

import Link from "next/link";

function LetterButton({ full, redirect, preceding = false, launchNewTab = false }: LetterProps) {
    const char = preceding ? full.charAt(full.length - 1) : full.charAt(0);
    const extras = preceding
        ? { "data-before-content": full.slice(0, full.length - 1) }
        : { "data-after-content": full.substring(1, full.length) };

    return (
        <Link href={redirect ?? "/"} target={launchNewTab ? "_blank" : "_self"}>
            <div className={`hoverable letter ${char.toLowerCase()}`} {...extras}>
                {char.toUpperCase()}
            </div>
        </Link>
    );
}

export default function Home() {
    return (
        <>
            <Metadata title="gdkid" />

            <div className="site-body">
                <div className="letters">
                    <LetterButton full="Github" redirect="https://github.com/fuh-Q" launchNewTab />
                    <LetterButton full="Dev stuff" redirect="/projects" />
                    <LetterButton full="Artwork" redirect="/artwork" preceding />
                    <LetterButton full="Idk" redirect="/idk" />
                    <LetterButton full="Discord server" redirect="https://discord.gg/gKEKpyXeEB" launchNewTab />
                </div>

                <div className="intro balls">
                    <span className="l-blob">
                        ✌️
                        <br />
                        hello world
                    </span>
                    <span className="r-blob">right nutsack ♥</span>
                </div>

                <Footer />
            </div>
        </>
    );
}
