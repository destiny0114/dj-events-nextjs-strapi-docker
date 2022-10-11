import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "@components/Layout";
import EventForm from "@components/EventForm";
import { parseCookie } from "@utils/helper";

type PageProps = {
    token: string | undefined;
};

export default function AddEventPage({ token }: PageProps) {
    return (
        <Layout>
            <Link href="/">
                <a className="text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
                    Go Back
                </a>
            </Link>

            <h1 className="text-3xl font-lato font-bold mt-5 after:bg-orange-600 after:block after:w-full after:my-5 after:h-1">Add Event</h1>
            <EventForm evt={null} token={token} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token } = parseCookie(context.req);

    if (!token)
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };

    return {
        props: {
            token: token ?? null,
        },
    };
};
