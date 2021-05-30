import styles from "./GalaxyBackground.module.scss";

export default function GalaxyBackground({ children }) {
  return (
    <>
      <div className={styles.background}>
        {"e"
          .repeat(20)
          .split("")
          .map((_, i) => (
            <span key={i} />
          ))}
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </>
  );
}
