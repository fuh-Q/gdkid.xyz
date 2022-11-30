import BackArrow from "../components/BackArrow";
import Footer from "../components/Footer";

import BotCard from "../components/BotCard";
import type Bot from "../types/Bot";

import Head from "next/head";

import { v4 as uuidv4 } from "uuid";

export default function Bots({ items }: { items: Bot[] }) {
    return (
        <>
            <Head>
                <title>discord bots</title>
            </Head>
            <div className="site-body">
                <BackArrow/>
                <div className="intro">
                    <span>discord bots<br/>(click the cards to invite!)</span>
                </div>
                <div className="bots">
                    {items.map(i => {return (
                        <li key={uuidv4()}>
                            <BotCard name={i.name} description={i.description} inviteUrl={i.inviteUrl}/>
                        </li>
                    )})}
                    <li>
                        <BotCard name="Soon™" description="I'll probably add more stuff in the future..."/>
                    </li>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const req = await fetch("http://localhost:3000/data/bots.json");
    const items = await req.json();

    return {
        props: { items },
        revalidate: 15,
    }
}
