import Metadata from "../components/Metadata";
import SitePage from "../components/SitePage";

import Image from "next/image";

export default function Idk() {
    return (
        <>
            <Metadata
                title="truly inspiring"
                ogDescription="the motivating and soul-lifting images i hang on my wall as i code this website"
            />

            <SitePage className="motivating-images" pageName="a motivating message" backTo="/idk">
                <Image src="https://i.vgy.me/JQhKJk.png" alt="html" width="340" height="308" />
                <Image src="https://i.vgy.me/aG1Igb.png" alt="css" width="340" height="308" />
                <Image src="https://i.vgy.me/TNLXGL.png" alt="ui" width="340" height="308" />
            </SitePage>
        </>
    );
}
