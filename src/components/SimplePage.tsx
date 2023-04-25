import SitePage from "./SitePage";

import Head from "next/head";

interface PageOpts {
    msg: string;
    head?: string;
}

export default function SimplePage({ msg, head }: PageOpts) {
    return (
        <>
            <Head>
                <title>{head || "gdkid"}</title>
            </Head>
            <SitePage pageName={msg} />
        </>
    );
}
