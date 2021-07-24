import TicTacToe from './tictactoe.js';
const board = document.querySelector('.board');
const playButton = document.querySelector('.btn');

const tictactoe = new TicTacToe(board);

tictactoe.renderBoard();
playButton.addEventListener('click', () => tictactoe.restart());
