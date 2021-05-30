import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.main}>
      <div className={styles.author}>
        <Link href="/">
          <h4>Home</h4>
        </Link>
        <p>Author: Pislea Emanuel</p>
        <div className={styles.social}>
          <a
            href="https://www.facebook.com/emanuel.emx/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/facebook.png" alt="Facebook" width={40} height={40} />
          </a>
        </div>
        <div className={styles.social}>
          <a
            href="https://www.linkedin.com/in/emanuel-pislea-35b196110/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/linkedin.png" alt="Linkedin" width={40} height={40} />
          </a>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          Copyright: This is a simple Rick and Morty project intended for
          learning purposes based on the{" "}
          <a
            href="https://rickandmortyapi.com/"
            rel="noreferrer"
            target="_blank"
          >
            Rick and Morty API.
          </a>
        </p>
        <p>
          Rick and Morty is created by Justin Roiland and Dan Harmon for Adult
          Swim. The data and images are used without claim of ownership and
          belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
