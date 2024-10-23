import Metadata from "../components/Metadata";
import { MoveArrow } from "../components/Calendar";
import { SitePage } from "../components/SitePage";
import items from "../../public/data/bots.json" assert { type: "json" };
import type { ImageScrollerProps, Project } from "../types/Project";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import type { MouseEvent } from "react";

import Image from "next/image";
import Link from "next/link";

function ImageScroller({ images }: ImageScrollerProps) {
    const [pos, setPosition] = useState<number>(0);

    const leftCB = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPosition(pos - 1);
    };

    const rightCB = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPosition(pos + 1);
    };

    const navigator = (
        <div className="bot-preview-arrows">
            <MoveArrow direction={-1} invisible={pos <= 0} callback={leftCB} />
            <span className="bot-preview-page-counter">{`${pos + 1} / ${images.length}`}</span>
            <MoveArrow direction={1} invisible={pos >= images.length - 1} callback={rightCB} />
        </div>
    );

    return (
        <div className="bot-preview-image-container">
            <Image className="bot-preview-image" src={images[pos][0]} alt={images[pos][1]} fill />
            {images.length > 1 ? navigator : null}
        </div>
    );
}

function ProjectCard({ name, description, images, inviteUrl }: Project) {
    const linkprops = { className: "botlink", target: "blank", href: inviteUrl as string };
    const nameAndDesc = (
        <div key={name} className={`bot${inviteUrl ? " invitable hoverable" : ""}`}>
            <div className="bot-name">{name}</div>
            <div className="bot-description">
                {typeof description === "string" ? description : description.join(" ")}
            </div>
            {images ? <ImageScroller images={images} /> : null}
        </div>
    );

    return inviteUrl ? <Link {...linkprops}>{nameAndDesc}</Link> : nameAndDesc;
}

export default function Projects() {
    const mainProjects = items.map((item) => (
        <li key={uuidv4()}>
            <ProjectCard
                name={item.name}
                description={item.description}
                inviteUrl={item.inviteUrl}
                images={item.images as [string, string][]}
            />
        </li>
    ));

    return (
        <>
            <Metadata
                title="dev projects"
                ogDescription="homemade random projects (why does it sound strange to describe them as 'homemade' lol)"
            />

            <SitePage className="bots" pageName="personal projects<br/>(click the cards to view!)">
                {mainProjects}
                <li>
                    <ProjectCard name="Soon™" description="I'll probably add more stuff in the future..." />
                </li>
            </SitePage>
        </>
    );
}
