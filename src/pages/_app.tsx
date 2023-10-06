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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}
