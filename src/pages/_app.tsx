import Layout from "@/components/Layout";
import { store } from "@/store";
import "@/styles/globals.css";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Phantom</title>
        <link rel="icon" href="favicon.png"></link>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}
