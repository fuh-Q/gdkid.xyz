import { ILink } from "../components/Footer";
import Metadata from "../components/Metadata";
import SitePage from "../components/SitePage";

export default function Idk() {
    return (
        <>
            <Metadata title="anything else" ogDescription="¯\_(ツ)_/¯" />

            <SitePage className="misc-links" pageName="miscellaneous">
                <ILink href="/notebook">notebook</ILink>
                <ILink href="/calendar">scream calendar</ILink>
                <ILink href="/inspire">inspiration and positivity</ILink>
            </SitePage>
        </>
    );
}
