import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en" style={{background: "black"}}>
            <Head>
                <meta property="og:url" content="https://gdkid.xyz"/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content="gdkid.xyz"/>
                <meta property="og:description" content="hi there o/"/>
                <meta property="og:image" content="/assets/gdkid.png"/>
                <meta property="og:image:alt" content="it's me"/>
                <meta property="og:locale" content="en_CA"/>
                <meta property="og:site_name" content="gdkid.xyz"/>
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}
