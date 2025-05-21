import { Board } from './board.js';

/**
 * Global game state object.
 * All modules should import and use this for shared state.
 */
const state = {
  CANVAS_WIDTH: 300,
  CANVAS_HEIGHT: 600,
  FPS: 60,
  isGameOver: false,
  isGameRestarted: false,
  isGameStarted: false,
  isGamePaused: false,
  score: 0,
  highScore: 0,
  level: 1,
  speed: 1,
  time: 0.0,
  linesCleared: 0,
  board: new Board(10, 20), // 10 columns, 20 rows
  currentPiece: null,
  nextPiece: null,
  storedPiece: null,
  combo: 0,
  lastDropSpeed: 1,
  longestTime: 0,
  mostLines: 0,
};

export default state;