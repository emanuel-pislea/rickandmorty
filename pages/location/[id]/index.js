import { gql } from "@apollo/client";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import Link from "next/link";
import client from "../../../apollo-client";
import styles from "./Location.module.scss";
import Layout from "../../../components/Layout";
import DataNotFound from "../../../components/DataNotFound";

export default function Location({ location }) {
  if (!location) {
    return <DataNotFound title="Location not found." />;
  }

  const { residents, name: currentLocName } = location;
  let alive = 0;
  let dead = 0;
  let currentGuests = 0;
  let robots = 0;
  let aliens = 0;
  let humans = 0;

  residents.forEach(({ status, origin: { name }, species }) => {
    if (status === "Alive") {
      alive += 1;
    } else if (status === "Dead") {
      dead += 1;
    }

    if (name !== currentLocName) {
      currentGuests += 1;
    }

    switch (species) {
      case "Human":
        humans += 1;
        break;
      case "Robot":
        robots += 1;
        break;
      default:
        aliens += 1;
        break;
    }
  });

  const data = {
    labels: [`Humans (${humans})`, `Robots (${robots})`, `Aliens (${aliens})`],
    datasets: [
      {
        data: [humans, robots, aliens],
        backgroundColor: ["#2fa14d", "#bac730", "#cc412f"],
        hoverBackgroundColor: ["#32ad53", "#c3d130", "#e04f3d"],
      },
    ],
  };

  return (
    <Layout pageTitle={`${currentLocName} from Rick and Morty.`}>
      <div className={styles.main}>
        <Link href="/">{"<- Back to the list"}</Link>
        <h2 className={styles.title}>Location: {location.name}</h2>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span>Alive</span>
            <h4>{alive}</h4>
          </div>
          <div className={styles.statItem}>
            <span>Dead</span>
            <h4>{dead}</h4>
          </div>
          <div className={styles.statItem}>
            <span>Guests</span>
            <h4>{currentGuests}</h4>
          </div>
          <div className={styles.statItem}>
            <span>Robots</span>
            <h4>{robots}</h4>
          </div>
          <div className={styles.statItem}>
            <span>Aliens</span>
            <h4>{aliens}</h4>
          </div>
          <div className={styles.statItem}>
            <span>Humans</span>
            <h4>{humans}</h4>
          </div>
        </div>
        {residents.length ? (
          <div className={styles.chart}>
            <Doughnut data={data} width={250} height={250} />
          </div>
        ) : null}
        <div className={styles.residentsGrid}>
          {residents.length ? (
            residents.map(({ id, status, name, species, gender, image }) => (
              <div key={id} className={styles.resident}>
                <div className={styles.information}>
                  <p>
                    <span>Name: </span>
                    {name}
                  </p>
                  <p className={styles[status.toLowerCase()]}>
                    <span>Status: </span>
                    {status}
                  </p>
                  <p>
                    <span>Species: </span>
                    {species}
                  </p>
                  <p>
                    <span>Gender: </span>
                    {gender}
                  </p>
                </div>
                <div className={styles.imageHolder}>
                  <Image src={image} alt={name} layout="fill" />
                </div>
              </div>
            ))
          ) : (
            <h3>No residents</h3>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { id } }) => {
  try {
    const {
      data: { location },
    } = await client.query({
      query: gql`
        query Location($input: ID!) {
          location(id: $input) {
            id
            name
            type
            dimension
            residents {
              name
              status
              species
              id
              gender
              image
              origin {
                name
              }
            }
          }
        }
      `,
      variables: {
        input: id,
      },
    });

    return {
      props: {
        location,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};
