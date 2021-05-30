import Head from "next/head";
const defaultPageTitle = "Rick and Morty: test site";

export default function HeadGenerate({ pageTitle }) {
  const title = pageTitle || defaultPageTitle;

  return (
    <Head>
      <title>{title}</title>
      <link rel="apple-touch-icon" href="/logo.png"></link>
      <meta property="og:title" content={title} key="title" />
      <meta
        name="description"
        content="Rick and Morty learning project.See all the Rick and Morty locations"
      />
    </Head>
  );
}
