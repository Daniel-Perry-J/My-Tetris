import state from './state.js';
import { gameLoop } from './logic.js';

/**
 * Draw the game state: board, pieces, and scoreboard.
 */
function drawGame() {
  gameLoop();
  state.board.draw();
  if (state.currentPiece) state.currentPiece.draw();
  // Optionally draw next/stored pieces
  // drawScoreboard();
}

/** Draw the scoreboard on the canvas. */
function drawScoreboard() {
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Score: ${state.score}`, 10, 10);
  text(`High Score: ${state.highScore}`, 10, 30);
  text(`Level: ${state.level}`, 10, 50);
  text(`Time: ${state.time.toFixed(2)}s`, 10, 70);
  text(`Lines: ${state.linesCleared}`, 10, 90);
}

/**
 * Reset the game state for a new game.
 */
function restartGame() {
  state.isGameOver = false;
  state.isGamePaused = false;
  state.isGameStarted = true;
  state.isGameRestarted = true;
  state.score = 0;
  state.level = 1;
  state.speed = 1;
  state.time = 0.0;
  state.linesCleared = 0;
  state.combo = 0;
  state.board.reset();
  state.currentPiece = null;
  state.nextPiece = null;
  state.storedPiece = null;
}

export { drawGame, restartGame };