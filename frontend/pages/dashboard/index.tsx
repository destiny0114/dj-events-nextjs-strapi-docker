import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Layout from "@components/Layout";
import DashboardEventItem from "@components/DashboardEventItem";
import { AuthEvent, EventResponse } from "@tstypes/Event";
import { fetchData, parseCookie } from "@utils/helper";
import { API_URL, PROXY_API } from "@config";

type PageProps = {
  events: [AuthEvent];
  token: string | undefined;
};

export default function DashboardPage({ events, token }: PageProps) {
  const router = useRouter();

  const handleDeleteEvent = async (id: string) => {
    try {
      await fetchData<EventResponse>(`${PROXY_API}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.reload();
    } catch (error) {
      toast("Failed to delete event.", {
        toastId: "toast-info",
      });
    }
  };

  const renderedDashboardEvents =
    Array.isArray(events) &&
    events.map((evt, i, arr) => (
      <DashboardEventItem evt={evt} key={i} last={i === arr.length - 1 ? true : false} onDeleteEvent={handleDeleteEvent} />
    ));

  return (
    <Layout title="DJ Events | Dashboard">
      <Link href="/">
        <a className="text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
          Go Back
        </a>
      </Link>
      <h1 className="text-3xl font-lato font-bold mt-5 after:bg-orange-600 after:block after:w-full after:my-5 after:h-1">Dashboard</h1>{" "}
      {events.length ? renderedDashboardEvents : <h3 className="text-3xl font-lato font-bold text-center my-10">No events to show</h3>}
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

  const events = await fetchData<[AuthEvent]>(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    props: { events, token: token ?? null },
  };
};
