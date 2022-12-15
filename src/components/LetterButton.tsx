import type LetterProps from "../types/Letter";
import Link from "next/link";

export default function LetterButton({
    full,
    redirect,
    preceding = false,
    newTab = false,
}: LetterProps) {
    const char = preceding ? full.charAt(full.length - 1) : full.charAt(0);
    const extras = preceding
                   ? { "data-before-content": full.slice(0, full.length - 1) }
                   : { "data-after-content": full.substring(1, full.length) };

    return (
        <Link href={redirect ?? "/"} target={newTab ? "_blank" : "_self"}>
            <div
                className={`letter ${char.toLowerCase()}`}
                {...extras}>
                {char.toUpperCase()}
            </div>
        </Link>
    );
}
