import React from 'react'
import styles from "../styles/Header.module.css"

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <p>RealAssist.AI</p>
        <p>123 Main Street, Dover, NH 03820-4667</p>
      </div>
      <div className={styles.border}></div>
    </div>
  );
}
