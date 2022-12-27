import Footer from "../components/Footer";
import LetterButton from "../components/LetterButton";

import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>gdkid</title>
            </Head>
            <div className="site-body">
                <div className="letters">
                    <LetterButton full="Github" redirect="https://github.com/kidgd" newTab={true} />
                    <LetterButton full="Discord server" redirect="https://discord.gg/gKEKpyXeEB" newTab={true} />
                    <LetterButton full="Artwork" redirect="/artwork" preceding={true} />
                    <LetterButton full="Idk" redirect="/notebook" />
                    <LetterButton full="Discord bots" redirect="/bots" />
                </div>
                <div className="intro balls">
                    <span className="l-blob">
                        ✌️
                        <br />
                        hello world
                    </span>
                    <span className="r-blob">welcome to my shitty little website :D</span>
                </div>
                <Footer />
            </div>
        </>
    );
}
