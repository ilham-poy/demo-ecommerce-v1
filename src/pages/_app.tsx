import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/AppShell";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({ Component, pageProps: { session, pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Nasywa Art Space | Rajutan & Seni Crochet</title>
        <meta name="description" content="Toko online rajutan dan crochet handmade. Temukan karya seni benang yang unik dan berkualitas." />
        <meta name="keywords" content="rajutan, crochet, handmade, seni benang, nasywa art, toko rajutan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Nasywa Art Space | Rajutan & Seni Crochet" />
        <meta property="og:description" content="Toko online rajutan dan crochet handmade. Temukan karya seni benang yang unik dan berkualitas." />
        <meta property="og:image" content="/default-og.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://nasywaartspace.vercel.app/" />
        <link rel="icon" href="/logo-nasywa.png" />
      </Head>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>

  )
}
