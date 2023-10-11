import styles from "../styles/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.border}></div>
      <div className={styles.contents}>
        <p>Report Generated on September 26, 2023</p>
        <p>
          RealAssist Property Report|Page 1<span>of25</span>{" "}
        </p>
      </div>
    </footer>
  );
}
