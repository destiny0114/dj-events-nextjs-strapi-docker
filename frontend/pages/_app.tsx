import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";

import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} hideProgressBar={true} draggable={false} closeOnClick={false} closeButton={false} />
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  if (appContext.ctx.res?.statusCode === 500) {
    appContext.ctx.res.writeHead(302, { Location: "/strapi" });
    appContext.ctx.res.end();
    return;
  }

  return { ...appProps };
};

export default MyApp;
