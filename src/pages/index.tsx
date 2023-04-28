import Footer from "../components/Footer";
import LetterButton from "../components/LetterButton";
import Metadata from "../components/Metadata";

export default function Home() {
    return (
        <>
            <Metadata title="gdkid" />

            <div className="site-body">
                <div className="letters">
                    <LetterButton full="Github" redirect="https://github.com/fuh-Q" newTab={true} />
                    <LetterButton full="Discord server" redirect="https://discord.gg/gKEKpyXeEB" newTab={true} />
                    <LetterButton full="Artwork" redirect="/artwork" preceding={true} />
                    <LetterButton full="Idk" redirect="/idk" />
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
