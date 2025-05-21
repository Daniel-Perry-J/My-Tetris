// Imports
import { Piece } from "./piece.js";
import state from "./state.js";
import { drawGame, restartGame } from "./game.js";
import { updateScoreboard } from "./scoreboard.js";
import { updateAndDrawEffects } from "./effects.js";

/**
 * Setup the p5.js sketch and initialize the game.
 */
function setup() {
  createCanvas(state.CANVAS_WIDTH, state.CANVAS_HEIGHT);
  frameRate(state.FPS);
  state.isGameStarted = true;
  state.currentPiece = new Piece();
  state.nextPiece = new Piece();
}

/**
 * Main draw loop for p5.js.
 */
function draw() {
  background(30);
  if (state.isGameOver) {
    drawGameOver();
    noLoop();
  } else if (state.isGameStarted) {
    drawGame();
    updateScoreboard(state);
    updateAndDrawEffects(state);
    if (state.isGamePaused) {
      fill(255, 0, 0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text('Paused', width / 2, height / 2);
    }
  } else {
    drawStartScreen();
  }
}

/** Draw the start screen. */
function drawStartScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Space Tetris", width / 2, height / 2 - 50);
  textSize(16);
  text("Press Enter to Start", width / 2, height / 2 + 50);
}

/** Draw the game over screen. */
function drawGameOver() {
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Game Over', width / 2, height / 2);
  textSize(16);
  text('Press R to Restart', width / 2, height / 2 + 40);
}

/**
 * Handle key presses for game controls.
 */
function keyPressed() {
  if (key === 'r' || key === 'R') {
    restartGame();
    loop();
  }
  if (key === 'p' || key === 'P') {
    state.isGamePaused = !state.isGamePaused;
  }
  if (keyCode === 27) { // ESC
    state.isGameOver = true;
  }
  if (!state.isGameStarted && keyCode === ENTER) {
    state.isGameStarted = true;
    loop();
  }
  // Add movement/rotation controls for the current piece
  if (state.currentPiece && !state.isGameOver && !state.isGamePaused) {
    if (keyCode === LEFT_ARROW) state.currentPiece.moveLeft();
    if (keyCode === RIGHT_ARROW) state.currentPiece.moveRight();
    if (keyCode === DOWN_ARROW) state.currentPiece.moveDown();
    if (keyCode === UP_ARROW) state.currentPiece.rotate();
    if (key === ' ') state.currentPiece.moveToBottom();
  }
}

// Attach p5.js hooks to window for module compatibility
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;