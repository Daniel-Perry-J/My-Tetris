/**
 * Updates the scoreboard fields in real time.
 * Call this function in your main game loop (e.g., in draw()).
 * Expects global state object.
 */
export function updateScoreboard(state) {
  document.getElementById('score').textContent = state.score;
  document.getElementById('highScore').textContent = state.highScore;
  document.getElementById('highestLevel').textContent = state.highestLevel || state.level;
  document.getElementById('level').textContent = state.level;
  document.getElementById('time').textContent = state.time.toFixed(2);
  document.getElementById('longestTime').textContent = state.longestTime.toFixed(2) || 0;
  document.getElementById('lines').textContent = state.linesCleared;
  document.getElementById('mostLines').textContent = state.mostLines || 0;
}