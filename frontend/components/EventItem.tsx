import Image from "next/image";
import Link from "next/link";
import { zeroPad } from "@utils/helper";
import { Event } from "@tstypes/Event";

type EventItemProps = {
    evt: Event["attributes"];
    index: number;
    last: boolean;
};

export default function EventItem({ evt, index, last }: EventItemProps) {
    return (
        <div className={`flex py-5 ${!last && "border-b border-gray-400"}`} key={evt.name}>
            <div className="w-1/6 flex gap-3 relative">
                <small className="font-lato">{new Date(evt.date).toLocaleDateString("en-us")}</small>
                <small className="font-lato">{evt.time}</small>
                <span className="absolute bottom-0 left-0 text-orange-400 text-[5rem] font-lato font-bold opacity-20">{zeroPad(index + 1, 2)}</span>
            </div>
            <Image
                className="w-1/4 object-contain"
                src={evt.image?.data ? evt.image.data.attributes.formats.small.url : "/images/event-default.png"}
                alt={evt.name}
                width={500}
                height={300}
            />
            <div className="flex-1 px-5 relative">
                <h1 className="text-4xl font-lato font-bold">{evt.name}</h1>
                <h3 className="font-lato font-normal">Performed by: {evt.performers}</h3>

                <div className="absolute bottom-0 border-b border-black">
                    <Link href={`/events/${evt.slug}`}>
                        <a className="text-xl font-lato uppercase">
                            Details
                            <i className=" ml-2 align-middle">
                                <Image src="/assets/arrow.svg" height={20} width={15} alt={evt.name} />
                            </i>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
