import state from './state.js';
import { Piece } from './piece.js';
import { triggerFlash, triggerExplosion, triggerComboText } from './effects.js';

/**
 * Save high scores, longest time, and most lines cleared to localStorage.
 */
function saveHighScores() {
  if (state.score > state.highScore) {
    state.highScore = state.score;
    localStorage.setItem('tetris_highScore', state.highScore);
  }
  if (state.time > (state.longestTime || 0)) {
    state.longestTime = state.time;
    localStorage.setItem('tetris_longestTime', state.longestTime);
  }
  if (state.linesCleared > (state.mostLines || 0)) {
    state.mostLines = state.linesCleared;
    localStorage.setItem('tetris_mostLines', state.mostLines);
  }
}

/**
 * Load high scores, longest time, and most lines cleared from localStorage.
 */
function loadHighScores() {
  state.highScore = Number(localStorage.getItem('tetris_highScore')) || 0;
  state.longestTime = Number(localStorage.getItem('tetris_longestTime')) || 0;
  state.mostLines = Number(localStorage.getItem('tetris_mostLines')) || 0;
}

/**
 * Main game loop logic: piece falling, locking, spawning, scoring, and game over.
 */
function gameLoop() {
  if (!state.isGameOver && !state.isGamePaused) {
    state.time += 1 / state.FPS;

    // Piece falling and locking
    if (state.currentPiece && state.currentPiece.update) {
      const locked = state.currentPiece.update();
      if (locked) {
        // Place piece on board
        state.board.lockPiece(state.currentPiece);
        state.lastDropSpeed = state.currentPiece.lastDropSpeed();
        state.currentPiece = null;
        state.combo = (state.combo || 0) + 1;
      }
    }

    // Spawn new piece if needed
    if (!state.currentPiece) {
      state.currentPiece = state.nextPiece || new Piece();
      state.nextPiece = new Piece();
      // Check for game over: if new piece collides immediately
      if (state.board.collides(state.currentPiece)) {
        state.isGameOver = true;
        saveHighScores();
        triggerFlash();
        noLoop();
        alert("Game Over");
        return;
      }
    }

    // Line clearing and scoring
    if (state.board && state.board.clearLines) {
      const clearedLines = state.board.clearLines();
      if (clearedLines > 0) {
        state.linesCleared += clearedLines;
        // Scoring: base * speed * combo * level
        const baseScore = 100 * clearedLines;
        const speedBonus = Math.max(1, 2 - (state.lastDropSpeed || 1));
        const comboBonus = (state.combo || 1);
        const levelBonus = state.level;
        state.score += Math.floor(baseScore * speedBonus * comboBonus * levelBonus);

        // Trigger effects
        triggerExplosion(
          (state.board.width / 2) * state.blockSize,
          (state.board.height / 2) * state.blockSize,
        );

        if (clearedLines === 4) triggerFlash();

        if (clearedLines > 1) {
          triggerComboText(
            (state.board.width / 2) * state.blockSize,
            (2) * state.blockSize,
            state.combo
          );
        }

        if (state.linesCleared >= state.level * 5 * state.level) {
          state.level++;
          state.speed *= 1.1;
        }
      } else {
        state.combo = 0; // Reset combo if no lines cleared
      }
    }
  }
}

export { gameLoop, loadHighScores, saveHighScores };
