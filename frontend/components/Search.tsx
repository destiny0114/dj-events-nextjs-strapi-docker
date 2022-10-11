import { useRouter } from "next/router";
import { useState, ChangeEvent, useEffect } from "react";
import useDebounce from "@hook/useDebounce";

export default function Search() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const debounceTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        if (!debounceTerm) return;

        router.push(`/events/search?term=${debounceTerm}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceTerm]);

    const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <form action="">
                <div className="flex items-center bg-white rounded-full px-4">
                    <input
                        className="w-[18em] h-10 text-lg font-lato font-bold outline-none bg-transparent"
                        type="text"
                        placeholder="Search event"
                        onChange={handleInputChanged}
                    />
                    <svg className="w-5 h-5 ml-2" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M27.1876 25.8619L20.1076 18.7819C21.8089 16.7394 22.6574 14.1195 22.4763 11.4674C22.2953 8.81529 21.0988 6.33505 19.1356 4.54267C17.1725 2.75029 14.5939 1.78376 11.9363 1.84414C9.27868 1.90453 6.74666 2.98718 4.86696 4.86688C2.98726 6.74658 1.90461 9.2786 1.84422 11.9362C1.78384 14.5938 2.75037 17.1724 4.54275 19.1355C6.33513 21.0987 8.81536 22.2952 11.4675 22.4762C14.1196 22.6573 16.7394 21.8089 18.782 20.1075L25.862 27.1875L27.1876 25.8619ZM3.75008 12.1875C3.75008 10.5187 4.24493 8.88742 5.17205 7.49988C6.09918 6.11234 7.41694 5.03088 8.95869 4.39227C10.5004 3.75365 12.1969 3.58656 13.8337 3.91213C15.4704 4.23769 16.9738 5.04128 18.1538 6.22129C19.3338 7.40129 20.1374 8.90471 20.463 10.5414C20.7885 12.1781 20.6214 13.8746 19.9828 15.4164C19.3442 16.9581 18.2627 18.2759 16.8752 19.203C15.4877 20.1302 13.8564 20.625 12.1876 20.625C9.95058 20.6225 7.80591 19.7328 6.22411 18.151C4.6423 16.5692 3.75256 14.4245 3.75008 12.1875Z"
                            fill="#000000"
                        />
                    </svg>
                </div>
            </form>
        </div>
    );
}
