import type { GetServerSideProps } from "next";

import Layout from "@components/Layout";
import EventItem from "@components/EventItem";

import { fetchData } from "@utils/helper";
import { API_URL } from "@config";
import { Events, Event } from "@tstypes/Event";

type PageProps = {
  events: Event[];
};

export default function HomePage({ events }: PageProps) {
  const renderedEvents = events.map((evt, i, arr) => <EventItem evt={evt.attributes} key={i} index={i} last={i === arr.length - 1 ? true : false} />);

  return (
    <Layout>
      <h1 className="text-3xl font-lato font-bold after:bg-orange-600 after:block after:w-full after:my-5 after:h-1">Upcoming Events</h1>

      {events.length === 0 ? <h3 className="text-3xl font-lato font-bold text-center my-10">No events to show</h3> : renderedEvents}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await fetchData<Events>(`${API_URL}/events?populate=image&sort=date:desc`);

  return {
    props: { events: data },
  };
};
