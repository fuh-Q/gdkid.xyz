import Link from "next/link";

export default function BackArrow() {
    return (
        <Link className="backarrow" href="/">
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#696969">
                <path d="M12 4L3 12L12 20 M7 12L21 12"/>
            </svg>
        </Link>
    );
}
