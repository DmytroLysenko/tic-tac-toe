import React from "react";

import styles from "./message.module.css";

export default function Setup({ message, onClose }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.message}>{message}</h2>
        <button onClick={onClose}>Continue fight</button>
      </div>
    </div>
  );
}
