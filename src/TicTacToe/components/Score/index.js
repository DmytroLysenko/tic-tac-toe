import React from "react";

import styles from "./score.module.css";

export default function Score({ score }) {
  const arr = Object.entries(score);
  return (
    <div className={styles.container}>
      <h2>Score</h2>
      <p>
        {arr[0][0]}: <span>{arr[0][1]}</span>
      </p>
      <p>
        {arr[1][0]}: <span>{arr[1][1]}</span>
      </p>
    </div>
  );
}
