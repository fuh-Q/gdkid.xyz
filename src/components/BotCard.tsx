import type Bot from "../types/Bot";
import Link from "next/link";

export default function BotCard({ name, description, inviteUrl }: Bot) {
    const child = (
        <div key={name} className={`bot${inviteUrl ? " invitable hoverable" : ""}`}>
            {name}
            <div className="bot-description">
                {typeof description === "string" ? description : description.join(" ")}
            </div>
        </div>
    );

    return inviteUrl ? (
        <Link className="botlink" target="_blank" href={inviteUrl}>
            {child}
        </Link>
    ) : (
        child
    );
}
