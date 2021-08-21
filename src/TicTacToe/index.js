import React, { useState } from "react";

import styles from "./tictactoe.module.css";

import Score from "./components/Score";
import PlayingField from "./components/PlayingField";
import Setup from "./components/Modals/Setup";
import Message from "./components/Modals/Message";

import game from "./GameController";

export default function TicTacToe() {
  const [isSetup, setSetup] = useState(false);
  const [score, setScore] = useState(null);
  const [state, setState] = useState(game.state);
  const [lineWin, setLineWin] = useState(null);
  const [player1_Team, setplayer1_Team] = useState(true);
  const [message, setMessage] = useState("");

  const handleSetup = ({ player1, player2, isVsComp, isPlayer1_X }) => {
    setScore({
      [player1]: 0,
      [player2]: 0,
    });

    game.initNewGame({ isVsComp, isPlayer1_X });

    setplayer1_Team(isPlayer1_X ? "X" : "O");

    setState({ ...game.result.state });
    setSetup(true);
  };

  const onCloseMessage = () => {
    game.continueCurrentGame();
    setState({ ...game.result.state });
    setMessage("");
    setLineWin(null);
  };

  const handleNextStep = (id) => {
    game.setNextStep(id);

    const result = game.result;

    setState({ ...result.state });

    if (result.winnerTeam) {
      handleWin(result);
    }
  };

  const handleWin = (result) => {
    if (result.winnerTeam === "draw") {
      setMessage("DRAW... Try again!");
    } else {
      const players = Object.keys(score);
      const winnerName =
        player1_Team === result.winnerTeam ? players[0] : players[1];
      setScore((prev) => ({
        ...prev,
        [winnerName]: prev[winnerName] + 1,
      }));
      setLineWin([...game.result.lineWin]);
      setMessage(`${winnerName} win!!!`);
    }
  };

  return (
    <div className={styles.container}>
      {!isSetup && <Setup onSetup={handleSetup} />}
      {message && <Message message={message} onClose={onCloseMessage} />}
      <PlayingField
        state={state}
        onNextStep={handleNextStep}
        lineWin={lineWin}
      />
      {score && <Score score={score} />}
    </div>
  );
}
