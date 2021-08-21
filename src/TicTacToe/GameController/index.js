const INIT_STATE = [null, null, null, null, null, null, null, null, null];

class Game {
  static X = "X";
  static O = "O";

  constructor() {
    this.gameMatrix = [...INIT_STATE];
    this.currentTeam = Game.X;
    this.lineWin = null;
    this.winnerTeam = null;
    this.linesWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  initNewGame({ isVsComp, isPlayer1_X }) {
    this.isVsComp = isVsComp;
    this.isPlayer1_X = isPlayer1_X;

    if (this.isVsComp && !this.isPlayer1_X) {
      this.cumputedNextStep();
    }
  }

  continueCurrentGame() {
    this.gameMatrix = [...INIT_STATE];
    this.lineWin = null;
    this.winnerTeam = null;
    this.currentTeam = Game.X;
    if (this.isVsComp && !this.isPlayer1_X) {
      this.cumputedNextStep();
    }
  }

  get result() {
    return {
      state: Object.assign({}, this.gameMatrix),
      lineWin: this.lineWin,
      winnerTeam: this.winnerTeam,
    };
  }

  setStepCurrentTeam(idx) {
    if (this.gameMatrix[idx]) {
      throw new Error("Selected field is not empty!!!");
    }
    this.gameMatrix[idx] = this.currentTeam;
    this.checkWinner();
    this.currentTeam = this.currentTeam === Game.X ? Game.O : Game.X;
  }

  checkWinner() {
    const line = this.linesWin.find((line) => {
      const length = line.filter(
        (idx) => this.gameMatrix[idx] === this.currentTeam
      ).length;
      if (length === 3) {
        return line;
      }
    });
    if (line) {
      this.winnerTeam = this.currentTeam;
      this.lineWin = line;
      return;
    }

    if (!this.gameMatrix.includes(null)) {
      return (this.winnerTeam = "draw");
    }
  }

  cumputedNextStep() {
    if (!this.gameMatrix[4]) {
      return this.setStepCurrentTeam(4);
    }

    const attackIdx = this.makeAttack();

    if (attackIdx) {
      return this.setStepCurrentTeam(attackIdx);
    }

    const protectionIdx = this.checkProtection();

    if (protectionIdx) {
      return this.setStepCurrentTeam(protectionIdx);
    }

    const freeStepIdx = this.makeFree();

    return this.setStepCurrentTeam(freeStepIdx);
  }

  setNextStep(id) {
    this.setStepCurrentTeam(id);

    const isComputeNextStep =
      this.isVsComp && this.isPlayer1_X === (this.currentTeam !== Game.X);

    if (isComputeNextStep) {
      this.cumputedNextStep();
    }
  }

  checkProtection() {
    const opposingTeam = this.currentTeam === Game.X ? Game.O : Game.X;

    const line = this.linesWin.find((line) => {
      const freeIdx = line.find((idx) => !this.gameMatrix[idx]);
      const count = line.filter(
        (item) => this.gameMatrix[item] === opposingTeam
      ).length;
      if (freeIdx && count === 2) {
        return line;
      }
    });

    if (line) {
      return line.find((idx) => !this.gameMatrix[idx]);
    } else {
      return false;
    }
  }

  makeAttack() {
    const line = this.linesWin.find((line) => {
      const freeIdx = line.find((idx) => !this.gameMatrix[idx]);
      const count = line.filter(
        (item) => this.gameMatrix[item] === this.currentTeam
      ).length;
      if (freeIdx && count === 2) {
        return line;
      }
    });
    if (line) {
      return line.find((idx) => !this.gameMatrix[idx]);
    } else {
      return false;
    }
  }

  makeFree() {
    const cornerIdx = [0, 2, 6, 8];
    const freeArrIdx = cornerIdx.filter((idx) => !this.gameMatrix[idx]);
    if (freeArrIdx.length) {
      return freeArrIdx[Math.floor(Math.random() * freeArrIdx.length)];
    }

    return this.gameMatrix.indexOf(null);
  }
}

export default new Game();
