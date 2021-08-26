import React, { useState } from "react";
import { Formik, Field } from "formik";

import styles from "./setup.module.css";

export default function Setup({ onSetup }) {
  const [firstPlayerTeam, setFirstPlayerTeam] = useState("X");
  const [secondPlayerTeam, setSecondPlayerTeam] = useState("O");

  const handleChangeTeam = () => {
    setFirstPlayerTeam((prev) => (prev === "X" ? "O" : "X"));
    setSecondPlayerTeam((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <div className={styles.backdrop}>
      <Formik
        initialValues={{
          mode: "vsComp",
          firstPlayerName: "",
          secondPlayerName: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstPlayerName) {
            errors.firstPlayerName = "Required";
          }
          if (values.mode !== "vsComp" && !values.secondPlayerName) {
            errors.secondPlayerName = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const gameSettings = {
            isVsComp: values.mode === "vsComp" ? true : false,
            player1: values.firstPlayerName,
            player2:
              values.mode === "vsComp" ? "Computer" : values.secondPlayerName,
            isPlayer1_X: firstPlayerTeam === "X" ? true : false,
          };
          onSetup(gameSettings);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className={styles.modal} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Setup New Game</h2>
            <h3 className={styles.subTitle} id="my-radio-group">
              Game mode
            </h3>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="mode" value="vsPlayer" />
                vs Player
              </label>
              <label>
                <Field type="radio" name="mode" value="vsComp" />
                vs Computer
              </label>
            </div>
            <h3 className={styles.subTitle}>Enter name</h3>
            <div className={styles.name}>
              <label>
                <strong>First Player Name</strong>
                <br />
                <Field
                  type="text"
                  name="firstPlayerName"
                  onChange={handleChange}
                  value={values.firstPlayerName}
                  placeholder="First Player"
                />
              </label>
              <label>
                <strong>Second Player Name</strong>
                <br />
                {values.mode === "vsComp" ? (
                  <div>Computer</div>
                ) : (
                  <Field
                    type="text"
                    name="secondPlayerName"
                    onChange={handleChange}
                    value={values.secondPlayerName}
                    placeholder="Second Player"
                  />
                )}
              </label>
            </div>
            <h3 className={styles.subTitle}>Select team</h3>
            <div className={styles.team}>
              <div>
                <p>
                  <strong>First Player Team</strong>
                </p>
                <p>{firstPlayerTeam} </p>
              </div>
              <button type="button" onClick={handleChangeTeam}>
                Interchange Team
              </button>
              <div>
                <p>
                  <strong>Second Player Team</strong>
                </p>
                <p>{secondPlayerTeam}</p>
              </div>
            </div>
            <p className={styles.message}>X goes first ;)</p>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
