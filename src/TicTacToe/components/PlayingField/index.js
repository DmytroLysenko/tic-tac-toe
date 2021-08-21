import React from "react";
import classNames from "classnames";

import styles from "./palyingfield.module.css";

export default function PlayingField({ state, onNextStep, lineWin }) {
  const handleClick = (e) => {
    const id = e.target.dataset.id;
    if (!state[id] && !lineWin) {
      onNextStep(id);
    }
  };
  const setFieldItem = (id) => {
    if (!state) return null;
    if (!state[id] && !lineWin) return styles.item_free;
    if (!state[id] && lineWin) return null;
    return state[id] === "X" ? styles.item_X : styles.item_O;
  };

  const setLineWin = (lineWin) => {
    if (!lineWin) {
      return styles.lineWin_none;
    }

    if (lineWin.toString() === "0,1,2") return styles.lineWin_horiz__top;
    if (lineWin.toString() === "3,4,5") return styles.lineWin_horiz__center;
    if (lineWin.toString() === "6,7,8") return styles.lineWin_horiz__buttom;
    if (lineWin.toString() === "0,3,6") return styles.lineWin_vert__left;
    if (lineWin.toString() === "1,4,7") return styles.lineWin_vert__center;
    if (lineWin.toString() === "2,5,8") return styles.lineWin_vert__right;
    if (lineWin.toString() === "0,4,8") return styles.lineWin_diag__down;
    if (lineWin.toString() === "8,4,0") return styles.lineWin_diag__down;
    if (lineWin.toString() === "6,4,2") return styles.lineWin_diag__up;
    if (lineWin.toString() === "2,4,6") return styles.lineWin_diag__up;
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div
        className={classNames(styles.item, setFieldItem(0))}
        data-id="0"
      ></div>
      <div
        className={classNames(styles.item, setFieldItem(1))}
        data-id="1"
      ></div>
      <div
        className={classNames(styles.item, setFieldItem(2))}
        data-id="2"
      ></div>
      <div
        className={classNames(styles.item, setFieldItem(3))}
        data-id="3"
      ></div>
      <div
        className={classNames(styles.item, setFieldItem(4))}
        data-id="4"
      ></div>
      <div
        className={classNames(styles.item, setFieldItem(5))}
        data-id="5"
      ></div>
      <div
        className={classNames(styles.item, setFieldItem(6))}
        data-id="6"
      ></div>
      <div
        className={classNames(styles.item, setFieldItem(7))}
        data-id="7"
      ></div>
      <div
        className={classNames(styles.item, setFieldItem(8))}
        data-id="8"
      ></div>
      <div className={styles.gap_vert_left}></div>
      <div className={styles.gap_vert_right}></div>
      <div className={styles.gap_horiz_top}></div>
      <div className={styles.gap_horiz_bottom}></div>
      <div className={classNames(setLineWin(lineWin))}></div>
    </div>
  );
}
