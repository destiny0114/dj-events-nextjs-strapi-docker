import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
import Layout from "../components/Layout";

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <div className="text-center">
        <Player
          src="/assets/lottie-404.json"
          renderer="svg"
          className="max-w-2xl select-none"
          loop
          autoplay
        />
        <h1 className="text-3xl font-lato font-bold my-2">Sorry, there is nothing here</h1>
        <span className="text-blue-500">
          <Link href="/">Go Back Home</Link>
        </span>
      </div>
    </Layout>
  );
}
