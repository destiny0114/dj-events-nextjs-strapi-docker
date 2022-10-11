import Search from "./Search";

export default function Showcase() {
    return (
        <div
            id="showcase"
            className="w-full h-[35rem] relative flex flex-col justify-center items-center text-center"
            style={{ background: "#000 url(/images/background.jpg) no-repeat center center" }}
        >
            <h1 className="font-lato font-bold text-white text-5xl mb-3">Welcome To The Party!</h1>
            <h2 className="font-lato font-bold text-white text-3xl mb-5">Find the hottest DJ events</h2>
            <Search />
        </div>
    );
}
