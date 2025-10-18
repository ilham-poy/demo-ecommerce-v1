import Head from "next/head";
import HomePage from "./home";

export default function Home() {
  return (
    <>
      <Head>
        {/* SEO biasa */}
        <title>Rajutan Handmade & Seni Crochet | Nasywa Art Space</title>
        <meta name="description" content="Toko online rajutan dan crochet handmade. Temukan karya seni benang yang unik dan berkualitas." />
        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Nasywa Art Space",
            url: "https://nasywaartspace.vercel.app/",
            description: "Toko online rajutan dan crochet handmade. Temukan karya seni benang yang unik dan berkualitas.",
            publisher: {
              "@type": "Organization",
              name: "Nasywa Art Space",
              logo: {
                "@type": "ImageObject",
                url: "https://nasywaartspace.vercel.app/logo-nasywa.png"
              }
            }
          })
        }} />
      </Head>
      <HomePage></HomePage>
    </>
  );
}
