import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/AppShell";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({ Component, pageProps: { session, pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>

      <AppShell>
        <Head>
          <title>Nasywa Art Space</title>
          <link rel="icon" href="/logo-nasywa.png" />
        </Head>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>

  )
}
