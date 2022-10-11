import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import qs from "qs";
import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import { API_URL } from "@config";
import { Events, Event } from "@tstypes/Event";
import { fetchData } from "@utils/helper";

type PageProps = {
    events: Event[];
};

type Props = {
    events: Event[];
};

interface Params extends ParsedUrlQuery {
    term: string;
}

export default function SearchPage({ events }: PageProps) {
    const { query } = useRouter();

    const renderedEvents = events.map((evt, i, arr) => (
        <EventItem
            evt={evt.attributes}
            key={i}
            index={i}
            last={i === arr.length - 1 ? true : false}
        />
    ));

    return (
        <Layout title="DJ Events | Search">
            <Link href="/events">
                <a className="text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
                    Go Back
                </a>
            </Link>

            <h1 className="mt-4 text-3xl font-lato font-bold after:bg-orange-600 after:block after:w-full after:my-5 after:h-1">
                Search Result For {query.term}
            </h1>

            {events.length === 0 ? (
                <h3 className="text-3xl font-lato font-bold text-center my-10">
                    No events to show
                </h3>
            ) : (
                renderedEvents
            )}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
    const { term } = context.query!;
    const query = qs.stringify(
        {
            filters: {
                name: {
                    $containsi: term,
                },
            },
            populate: "image",
            sort: "date:desc",
        },
        { encodeValuesOnly: true }
    );

    const { data } = await fetchData<Events>(`${API_URL}/events?${query}`);

    return {
        props: { events: data },
    };
};
