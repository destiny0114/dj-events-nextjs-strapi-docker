import Link from "next/link";
import { useMemo } from "react";
import { ITEMS_PER_PAGE } from "@config";

type Props = {
    count: number;
    page: number;
    total: number;
};

export default function Pagination({ count, page, total }: Props) {
    const numberOfPages = useMemo(() => Math.ceil(total / ITEMS_PER_PAGE), [total]);
    const from = useMemo(() => (page - 1) * ITEMS_PER_PAGE + 1, [page]);
    const to = useMemo(() => (numberOfPages === page ? ITEMS_PER_PAGE * (page - 1) + count : ITEMS_PER_PAGE * page), [count, numberOfPages, page]);

    return (
        <div className="flex justify-between items-center">
            {page > 1 && (
                <Link href={`/events?page=${page - 1}`}>
                    <a className="text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
                        Prev
                    </a>
                </Link>
            )}
            <p className="font-lato font-bold text-center">{`Showing ${from} to ${to} of ${total} results`}</p>
            {page < numberOfPages && (
                <Link href={`/events?page=${page + 1}`}>
                    <a className="text-xl font-lato uppercase border border-black px-4 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white">
                        Next
                    </a>
                </Link>
            )}
        </div>
    );
}
