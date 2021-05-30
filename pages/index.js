import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import Select from "../components/Select";
import Dimensions from "../constants/Dimensions";
import Types from "../constants/Types";
import DataNotFound from "../components/DataNotFound";

export default function Home({ locations, error }) {
  const router = useRouter();
  const { results, info } = locations || { info: {} };

  const handlePageChange = (newPage) =>
    router.push({
      pathname: "/",
      query: { ...router.query, page: newPage },
    });

  return error ? (
    <DataNotFound title="Locations not found." />
  ) : (
    <Layout>
      <div className={styles.filters}>
        <Select options={Types} label="Type: " name="type" />
        <Select options={Dimensions} label="Dimension: " name="dimension" />
        <div className={styles.resetFilters}>
          <Link href="/">Reset filters</Link>
        </div>
      </div>
      <h2 className={styles.mainTitle}>Locations</h2>
      <div className={styles.grid}>
        {results.map(({ id, name, residents, type: t, dimension: dim }) => (
          <Link key={id} href="/location/[id]" as={`/location/${id}`}>
            <div className={styles.card}>
              <h3>{name}</h3>
              <p>Residents: {residents.length}</p>
              <p>Dimension: {dim}</p>
              <p>Type: {t}</p>
              <div className={styles.seeMore}>See more data</div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.pagination}>
        {info.prev ? (
          <div onClick={() => handlePageChange(info.prev)}>Previous Page</div>
        ) : null}
        {info.next ? (
          <div onClick={() => handlePageChange(info.next)}>Next Page</div>
        ) : null}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({
  query: { dimension, type, page = 0 },
}) {
  const variables = { page: +page };
  if (dimension) {
    variables.filter = { dimension };
  }
  if (type) {
    variables.filter = { ...(variables.filter || {}), type };
  }

  try {
    const {
      data: { locations },
    } = await client.query({
      query: gql`
        query Locations($page: Int, $filter: FilterLocation) {
          locations(page: $page, filter: $filter) {
            info {
              next
              prev
            }
            results {
              id
              name
              type
              dimension
              residents {
                id
              }
            }
          }
        }
      `,
      variables,
    });

    return {
      props: {
        locations,
      },
    };
  } catch (e) {
    return {
      props: {
        error: true,
      },
    };
  }
}
