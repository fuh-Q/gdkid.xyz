import BackArrow from "../components/BackArrow";
import Footer from "../components/Footer";

import Head from "next/head";

export default function NotFound() {
    return (
        <>
            <Head>
                <title>not found</title>
            </Head>
            <div className="site-body">
                <BackArrow/>
                <div className="intro">
                    <span>page not found</span>
                </div>
                <Footer/>
            </div>
        </>
    );
}
