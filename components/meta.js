import Head from "next/head";

export default function Meta({ pagetitle, keywords, description }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{pagetitle}</title>
    </Head>
  );
}

Meta.defaultProps = {
  title: "Monoceros",
  keywords: "packages, deliveries, sensor",
  description: "Web site created using create-next-app",
};
