import type Bot from "../types/Bot";

import Link from "next/link";

export default function BotCard({ name, description, inviteUrl }: Bot) {
    return (
        <Link
            className="botlink"
            href={inviteUrl ?? "/bots"}
            target={inviteUrl ? "_blank" : "_self"}>
            <div
                key={name}
                className={`bot${inviteUrl ? ' invitable' : ''}`}>
                {name}
                <div className="bot-description">
                    {typeof description === "string" ? description : description.join(" ")}
                </div>
            </div>
        </Link>
    );
}
