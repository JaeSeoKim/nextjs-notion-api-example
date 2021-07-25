import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress
        color={"#FCD1D1"}
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
