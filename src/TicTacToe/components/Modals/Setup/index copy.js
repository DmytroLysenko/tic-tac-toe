import React, { useState } from "react";

import styles from "./setup.module.css";

export default function Setup({ onSetup }) {
  const [isVsComp, setIsVsComp] = useState(true);
  const [namePlayer1, setNamePlayer1] = useState("");
  const [namePlayer2, setNamePlayer2] = useState("");
  const [isPlayer1_X, setIsPlayer1_X] = useState(true);

  const handleChangeMode = (e) => {
    setIsVsComp(e.target.name === "vsComp" ? true : false);
    if (e.target.name === "vsComp") {
      setNamePlayer2("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namePlayer1) return console.log("Set Player 1 name");
    if (!isVsComp && !namePlayer2)
      return console.log("In this mode need set Player 2 name");

    const gameSettings = {
      isVsComp,
      player1: namePlayer1,
      player2: namePlayer2 ? namePlayer2 : "Computer",
      isPlayer1_X,
    };
    onSetup(gameSettings);
  };

  return (
    <div className={styles.backdrop}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Set up your Game</h2>
        <h3 className={styles.subTitle}>Select game mode</h3>
        <div className={styles.mode}>
          <label>
            <input
              type="radio"
              name="vsComp"
              checked={isVsComp}
              onChange={handleChangeMode}
            />
            vs Computer
          </label>

          <label>
            <input
              type="radio"
              name="vsUser"
              checked={!isVsComp}
              onChange={handleChangeMode}
            />
            vs Player
          </label>
        </div>
        <h3 className={styles.subTitle}>Enter your name</h3>
        <div className={styles.name}>
          <label>
            Player 1:
            <br />
            <input
              type="text"
              placeholder="Player 1 name"
              onChange={(e) => setNamePlayer1(e.target.value)}
              value={namePlayer1}
            />
          </label>
          <span>
            <strong>VS</strong>
          </span>

          <label>
            Player 2:
            <br />
            {!isVsComp ? (
              <input
                type="text"
                placeholder="Player 2 name"
                onChange={(e) => setNamePlayer2(e.target.value)}
                value={namePlayer2}
              />
            ) : (
              <span>Computer</span>
            )}
          </label>
        </div>
        <h3 className={styles.subTitle}>Select team</h3>
        <div className={styles.team}>
          <p>
            Player 1: <br /> <strong>{isPlayer1_X ? "X" : "O"}</strong>
          </p>
          <button type="button" onClick={() => setIsPlayer1_X((prev) => !prev)}>
            Change
          </button>
          <p>
            Player 2: <br /> <strong>{isPlayer1_X ? "O" : "X"}</strong>
          </p>
        </div>
        <p className={styles.message}>X goes first ;)</p>
        <button className={styles.btnSubmit} type="submit">
          Save and Start
        </button>
      </form>
    </div>
  );
}
