import "../styles/globals.scss";
import Mouse from "../components/Mouse";
import CPSCounter from "../components/CPSCounter";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Mouse mouseN={1} />
            <Mouse mouseN={2} />
            <Mouse mouseN={3} />
            <Mouse mouseN={4} />
            <Component {...pageProps} />
            <CPSCounter />
        </>
    );
}
