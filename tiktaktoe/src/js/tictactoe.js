export default class TicTacToe {
  constructor(board) {
    this.board = board;
    this.resultEl = document.querySelector('.result h3');
    this.boardItem = [];
    this.gameState = true;
    this.winner = null;
    this.player = {
      name: 'player',
      score: 0,
      icon: 'O'
    };
    this.computer = {
      name: 'computer',
      score: 0,
      icon: 'X'
    };
    this.scores = {
      [this.player]: -1,
      [this.computer]: 1,
      tie: 0
    };
    this.currentPlayer = this.player;
  }
  renderBoard() {
    this.board.innerHTML = '';
    this.boardItem = Array.from({ length: 3 }).map((_) => Array.from({ length: 3 }).map((_) => null));

    this.boardItem.forEach((_, rowIndex) => {
      this.boardItem[rowIndex].forEach((_, columnIndex) => {
        const divEl = document.createElement('div');
        divEl.classList.add('board__item');
        divEl.setAttribute('data-row', rowIndex);
        divEl.setAttribute('data-col', columnIndex);
        divEl.addEventListener('click', (e) => {
          this.handleClick(e);
        });
        this.board.appendChild(divEl);
      });
    });
  }
  handleClick(e) {
    const currentEl = e.target;
    const row = Number(currentEl.dataset.row);
    const col = Number(currentEl.dataset.col);
    if (!this.gameState || !this.isCellEmpty(this.boardItem[row][col])) {
      return;
    }
    this.updateBoard(row, col);

    if (this.checkWinner() && this.checkWinner() !== 'tie') {
      this.winner = this.checkWinner();
      this.winner.score++;
      this.updateScore(this.winner);
      this.displayWinner();
      this.gameState = false;
      return;
    }

    if (this.isBoardFull()) {
      this.displayDraw();
      this.gameState = false;
      return;
    }

    this.changeTurn();
    this.computerMove();
  }
  computerMove() {
    this.bestMove();
    this.changeTurn();
  }
  bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.boardItem[i][j] === null) {
          this.boardItem[i][j] = this.computer;
          let score = this.minimax(this.boardItem, 0, false);
          console.log(score);
          this.boardItem[i][j] = null;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    this.updateBoard(move.i, move.j);
  }
  minimax(board, depth, isMaximizing) {
    const winner = this.checkWinner();

    if (winner !== null) {
      return this.scores[winner];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = this.computer;
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }

      return bestScore;
      // eslint-disable-next-line no-else-return
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = this.player;
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
      }

      return bestScore;
    }
  }
  updateScore(winner) {
    const playerScoreEl = document.querySelector('.scores__player span');
    const computerScoreEl = document.querySelector('.scores__computer span');

    if (winner === this.player) {
      playerScoreEl.textContent = this.player.score;
    } else {
      computerScoreEl.textContent = this.computer.score;
    }
  }
  updateBoard(row, col) {
    this.boardItem[row][col] = this.currentPlayer;
    const boardItems = document.querySelector(`.board__item[data-row="${row}"][data-col="${col}"]`);
    boardItems.textContent = this.currentPlayer.icon;
  }
  restart() {
    this.resultEl.textContent = '';
    this.winner = null;
    this.gameState = true;
    this.currentPlayer = this.player;
    this.renderBoard();
  }
  changeTurn() {
    this.currentPlayer = this.currentPlayer === this.player ? this.computer : this.player;
  }
  displayDraw() {
    this.resultEl.textContent = 'draw';
  }
  displayWinner() {
    if (this.winner) {
      this.resultEl.textContent = this.winner.name;
    }
  }
  isCellEmpty(cell) {
    return !cell;
  }
  checkWinner() {
    if (this.checkRow() || this.checkCol() || this.checkLeftDiag() || this.checkRightDiag()) {
      return this.checkRow() || this.checkCol() || this.checkLeftDiag() || this.checkRightDiag();
    }
    if (this.isBoardFull()) {
      return 'tie';
    }
    return null;
  }
  isBoardFull() {
    return !this.boardItem.some((item) => item.includes(null));
  }
  checkRow() {
    let winner = null;
    for (let i = 0; i < this.boardItem.length; i++) {
      const firstCell = this.boardItem[i][0];
      const secondCell = this.boardItem[i][1];
      const thirdCell = this.boardItem[i][2];
      if (this.deepEqual(firstCell, secondCell, thirdCell)) {
        winner = firstCell;
        return winner;
      }
    }
    return winner;
  }
  checkCol() {
    let winner = null;
    for (let i = 0; i < this.boardItem.length; i++) {
      const firstCell = this.boardItem[0][i];
      const secondCell = this.boardItem[1][i];
      const thirdCell = this.boardItem[2][i];
      if (this.deepEqual(firstCell, secondCell, thirdCell)) {
        winner = firstCell;
        return winner;
      }
    }
    return winner;
  }
  checkLeftDiag() {
    let winner = null;
    const firstCell = this.boardItem[0][0];
    const secondCell = this.boardItem[1][1];
    const thirdCell = this.boardItem[2][2];
    if (this.deepEqual(firstCell, secondCell, thirdCell)) {
      winner = firstCell;
      return winner;
    }
    return winner;
  }
  checkRightDiag() {
    let winner = null;
    const firstCell = this.boardItem[0][2];
    const secondCell = this.boardItem[1][1];
    const thirdCell = this.boardItem[2][0];
    if (this.deepEqual(firstCell, secondCell, thirdCell)) {
      winner = firstCell;
      return winner;
    }
    return winner;
  }
  deepEqual(cell1, cell2, cell3) {
    return cell1 === cell2 && cell2 === cell3 && cell1 !== null;
  }
}
