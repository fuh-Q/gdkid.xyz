import BotCard from "../components/BotCard";
import Metadata from "../components/Metadata";
import SitePage from "../components/SitePage";
import items from "../../public/data/bots.json" assert { type: "json" };

import { v4 as uuidv4 } from "uuid";

export default function Bots() {
    return (
        <>
            <Metadata
                title="discord bots"
                ogDescription="homemade discord bots (why does it sound strange to describe them as 'homemade' lol)"
            />

            <SitePage className="bots" pageName="discord bots<br/>(click the cards to invite!)">
                {items.map((item) => {
                    return (
                        <li key={uuidv4()}>
                            <BotCard name={item.name} description={item.description} inviteUrl={item.inviteUrl} />
                        </li>
                    );
                })}
                <li>
                    <BotCard name="Soon™" description="I'll probably add more stuff in the future..." />
                </li>
            </SitePage>
        </>
    );
}
