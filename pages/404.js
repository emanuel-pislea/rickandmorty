import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PageNotFound.module.scss";
import Layout from "../components/Layout";

export default function NotFound() {
  return (
    <Layout pageTitle="Rick and Morty: Page not found 404">
      <div className={styles.main}>
        <Link href="/">
          <div className={styles.imageHolder}>
            <Image src="/404.png" alt="Dimension not found" layout="fill" />
          </div>
        </Link>
        <h2>
          Lost your portal gun ? Use this <Link href="/">portal</Link> for free.
        </h2>
      </div>
    </Layout>
  );
}
