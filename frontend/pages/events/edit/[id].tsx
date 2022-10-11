import { GetServerSideProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import Layout from "@components/Layout";
import EventForm from "@components/EventForm";
import { Event, EventResponse } from "@tstypes/Event";
import { API_URL } from "@config";
import { fetchData, parseCookie } from "@utils/helper";

type PageProps = {
    evt: Event;
    token: string | undefined;
};

type Props = {
    evt: Event;
    token: string | undefined;
};

interface Params extends ParsedUrlQuery {
    id: string;
}

export default function EditEventPage({ evt, token }: PageProps) {
    return (
        <Layout>
            <Link href="/">
                <a className="text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
                    Go Back
                </a>
            </Link>

            <h1 className="text-3xl font-lato font-bold mt-5 after:bg-orange-600 after:block after:w-full after:my-5 after:h-1">Edit Event</h1>
            <EventForm evt={evt} token={token} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
    const { token } = parseCookie(context.req);
    if (!token)
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };

    const { id } = context.params!;
    const { data } = await fetchData<EventResponse>(`${API_URL}/events/${id}`);

    return {
        props: {
            evt: data,
            token: token ?? null,
        },
    };
};
