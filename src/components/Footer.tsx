import Image from "next/image";
import Link from "next/link";

type ILinkProps = {
    href: string;
    children: string;
    target?: string;
};

export function ILink({ href, children, target }: ILinkProps) {
    return (
        <Link className="hoverable link" target={target ?? "_self"} href={href}>
            <i>{children}</i>
        </Link>
    );
}

export default function Footer() {
    return (
        <div className="site-footer">
            <Image className="footer-icon" width="32" height="32" alt="" src="/assets/gdkid.png" />
            <div className="footer-text">• </div>
            <ILink target="_blank" href="https://github.com/fuh-Q/gdkid.xyz">
                Source on GitHub
            </ILink>
        </div>
    );
}
