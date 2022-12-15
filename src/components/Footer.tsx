import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="site-footer">
            <Image className="footer-icon" width="32" height="32" alt="" src="/assets/gdkid.png"/>
            <div className="footer-text">• </div>
            <Link className="link footer-src-link" target="_blank" href="https://github.com/dim-witted/gdkid.xyz">
                <i>Source on GitHub</i>
            </Link>
        </div>
    );
}
