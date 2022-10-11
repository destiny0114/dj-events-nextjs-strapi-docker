import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";

type LayoutProps = {
    title?: string;
    description?: string;
    keywords?: string;
    children?: React.ReactNode;
};

export default function Layout({ title, description, keywords, children }: LayoutProps) {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>

            <Header />

            {router.pathname === "/" && <Showcase />}

            <section id="body" className="container mx-auto my-10">
                {children}
            </section>

            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: "DJ Events | Find the hottest parties",
    description: "Find the latest DJ and other musical events",
    keywords: "music, dj, edm, events",
};
