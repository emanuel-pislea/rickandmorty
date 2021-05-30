import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="Rick and Morty" width={100} height={100} />
      </div>
      <Link href="/">
        <h1>Rick and Morty</h1>
      </Link>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="Rick and Morty" width={100} height={100} />
      </div>
    </header>
  );
}
