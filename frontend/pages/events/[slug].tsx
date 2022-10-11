import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import { MouseEventHandler, useMemo } from "react";
import { toast } from "react-toastify";
import Layout from "@components/Layout";
import { MapProps } from "@components/EventMap";
import { Event, EventResponse, Events } from "@tstypes/Event";
import { fetchData, parseCookie } from "@utils/helper";
import { API_URL, PROXY_API } from "@config";
import { useAuth } from "@context/AuthContext";

type PageProps = {
  evt: Event;
  token: string | undefined;
};

type Props = {
  evt: Event;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function EventPage({ evt, token }: PageProps) {
  const router = useRouter();
  const { auth } = useAuth();

  const Map = useMemo(
    () =>
      dynamic<MapProps>(() => import("@components/EventMap").then((mod) => mod.EventMap), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const handleDeleteEvent: MouseEventHandler<HTMLAnchorElement> = async () => {
    try {
      await fetchData<EventResponse>(`${PROXY_API}/events/${evt.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/");
      toast("Deleted event.", {
        toastId: "toast-info",
      });
    } catch (error) {
      toast("Failed to delete event.", {
        toastId: "toast-info",
      });
    }
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <Link href="/">
          <a className="text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
            Go Back
          </a>
        </Link>
        {auth.user && (
          <div>
            <Link href={`/events/edit/${evt.id}`}>
              <a className="text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
                Edit
              </a>
            </Link>
            <a
              onClick={handleDeleteEvent}
              className="cursor-pointer text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white"
            >
              Delete
            </a>
          </div>
        )}
      </div>
      <div className="flex border border-black">
        <div className="w-3/5 border-r border-black p-10">
          <div className="flex gap-3 mb-4">
            <small className="font-lato text-2xl">{new Date(evt.attributes.date).toLocaleDateString("en-us")}</small>
            <small className="font-lato text-2xl">{evt.attributes.time}</small>
          </div>
          <h1 className="text-6xl text-orange-800 font-lato font-bold max-w-xl">{evt.attributes.name}</h1>
          <div className="border-t-4 border-black max-w-lg"></div>
          <p className="text-gray-500 max-w-xl my-[5em]">{evt.attributes.description}</p>

          <div className="flex">
            <div className="border-4 border-black mr-5"></div>
            <div>
              <h3 className="font-lato text-4xl font-thin text-orange-800">Venue: {evt.attributes.venue}</h3>

              <h3 className="max-w-lg font-lato text-4xl font-thin text-orange-800">Address: {evt.attributes.address}</h3>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#015694]">
          <div className="w-4/5 select-none">
            <Image
              src={
                evt.attributes.image?.data
                  ? evt.attributes.image?.data.attributes.formats.large?.url ?? evt.attributes.image.data.attributes.url
                  : "/images/event-default.png"
              }
              alt={evt.attributes.name}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
              priority
            />
          </div>
          <div className="p-5">
            <h1 className="text-[#EAE6E0] font-lato text-2xl font-normal">Performed by:</h1>
            <h1 className="text-[#EAE6E0] font-lato text-5xl font-normal">{evt.attributes.performers}</h1>
          </div>
        </div>
      </div>
      <Map address={evt.attributes.address} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query!;
  const { token } = parseCookie(context.req);
  const { data } = await fetchData<Events>(`${API_URL}/events?filters[slug]slug=${slug}&populate=image`);

  return {
    props: { evt: data[0], token: token ?? null },
  };
};
