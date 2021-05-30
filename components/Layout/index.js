import GalaxyBackground from "../GalaxyBackground";
import Header from "../Header";
import Footer from "../Footer";
import Head from "../Head";

export default function Layout({ children, pageTitle = "" }) {
  return (
    <>
      <Head pageTitle={pageTitle} />
      <Header />
      <GalaxyBackground>{children}</GalaxyBackground>
      <Footer />
    </>
  );
}
