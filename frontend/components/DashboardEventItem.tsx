import { MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthEvent } from "@tstypes/Event";

type DashboardEventItemProps = {
    evt: AuthEvent;
    last: boolean;
    onDeleteEvent: (id: string) => void;
};

export default function DashboardEventItem({ evt, last, onDeleteEvent }: DashboardEventItemProps) {
    const handleDeleteEvent: MouseEventHandler<HTMLAnchorElement> = () => {
        onDeleteEvent(evt.id as string);
    };

    return (
        <div className={`flex py-5 ${!last && "border-b border-gray-400"}`} key={evt.name}>
            <div className="w-1/6 flex gap-3 relative">
                <small className="font-lato">{new Date(evt.date).toLocaleDateString("en-us")}</small>
                <small className="font-lato">{evt.time}</small>
            </div>
            <Image
                className="w-1/4 object-contain"
                src={evt.image ? evt.image.formats.small.url : "/images/event-default.png"}
                alt={evt.name}
                width={500}
                height={300}
            />
            <div className="flex-1 px-5 relative">
                <h1 className="text-4xl font-lato font-bold">{evt.name}</h1>
                <h3 className="font-lato font-normal">Performed by: {evt.performers}</h3>

                <div className="absolute bottom-0">
                    <Link href={`/events/edit/${evt.id}`}>
                        <a className="mr-4 text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
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
            </div>
        </div>
    );
}
