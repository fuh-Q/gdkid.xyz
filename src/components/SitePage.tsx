import Footer from "./Footer";

import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

function BackArrow({ href }: { href?: string }) {
    return (
        <Link className="hoverable backarrow" href={href ?? "/"}>
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#696969"
            >
                <path d="M12 4L3 12L12 20 M7 12L21 12" />
            </svg>
        </Link>
    );
}

interface SitePageProps {
    pageName: string;
    className?: string;
    backTo?: string;
    children?: ReactNode;
}

export function SitePage({ pageName, className, backTo, children }: SitePageProps) {
    const content = className ? <div className={className}>{children}</div> : children;

    return (
        <div className="site-body">
            <BackArrow href={backTo} />
            <div className="intro">
                <span dangerouslySetInnerHTML={{ __html: pageName }} />
            </div>

            {content}

            <Footer />
        </div>
    );
}

interface PageOpts {
    msg: string;
    head?: string;
}

export function SimplePage({ msg, head }: PageOpts) {
    return (
        <>
            <Head>
                <title>{head || "gdkid"}</title>
            </Head>
            <SitePage pageName={msg} />
        </>
    );
}
