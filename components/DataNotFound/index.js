import Link from "next/link";
import Layout from "../Layout";
import DarkSvg from "../../svgs/RickAndMortyDark";
import styles from "./DataNotFound.module.scss";

const DataNotFound = ({ title }) => (
  <Layout>
    <div className={styles.notFound}>
      <DarkSvg />
      <h1>{title}</h1>
      <h2>
        Here is <Link href="/">the full list</Link> of locations
      </h2>
    </div>
  </Layout>
);

export default DataNotFound;
