import Link from "next/link";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import Pagination from "@components/Pagination";
import { Events, Event } from "@tstypes/Event";
import { API_URL, ITEMS_PER_PAGE } from "@config";
import { fetchData } from "@utils/helper";

type PageProps = {
    events: Event[];
    page: number;
    total: number;
};

type Props = {
    events: Event[];
};

interface Params extends ParsedUrlQuery {
    page: string;
}

export default function EventsPage({ events, page, total }: PageProps) {
    const renderedEvents = events.map((evt, i, arr) => (
        <EventItem evt={evt.attributes} key={i} index={i} last={i === arr.length - 1 ? true : false} />
    ));

    return (
        <Layout title="DJ Events | All Events">
            <Link href="/">
                <a className="text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
                    Go Back
                </a>
            </Link>
            <h1 className="text-3xl font-lato font-bold mt-5 after:bg-orange-600 after:block after:w-full after:my-5 after:h-1">Events</h1>
            {events.length === 0 ? <h3 className="text-3xl font-lato font-bold text-center my-10">No events to show</h3> : renderedEvents}
            {!!events.length && <Pagination page={page} total={total} count={events.length} />}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
    const { page = 1 } = context.query!;
    const start = parseInt(page as string) === 1 ? 0 : (parseInt(page as string) - 1) * ITEMS_PER_PAGE;
    const events = await fetchData<Events>(
        `${API_URL}/events?sort=date:desc&pagination[start]=${start}&pagination[limit]=${ITEMS_PER_PAGE}&populate=image`
    );

    return {
        props: { events: events.data, page: parseInt(page as string), total: events.meta.pagination.total },
    };
};
