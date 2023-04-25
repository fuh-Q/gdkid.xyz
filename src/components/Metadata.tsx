import Head from "next/head";

type MetaProps = {
    title?: string;
    ogDescription?: string;
    ogImage?: string;
    ogImageAlt?: string;
};

export default function Metadata({
    title = "gdkid.xyz",
    ogDescription = "hi there o/",
    ogImage = "/assets/gdkid.png",
    ogImageAlt = "it's me",
}: MetaProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:url" content="https://gdkid.xyz" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:alt" content={ogImageAlt} />
            <meta property="og:locale" content="en_CA" />
            <meta property="og:site_name" content="gdkid.xyz" />
        </Head>
    );
}
