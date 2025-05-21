import { Piece } from "./piece.js";

/**
 * Board class for Tetris.
 * Handles grid, drawing, line clearing, locking, and collision.
 */
class Board {
  /**
   * @param {number} columns Number of columns (width)
   * @param {number} rows Number of rows (height)
   */
  constructor(columns = 10, rows = 20) {
    this.width = columns;
    this.height = rows;
    this.grid = this.createGrid();
  }

  /** Create an empty grid. */
  createGrid() {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }

  /** Draw the board grid and filled cells. */
  draw() {
    const cellSize = 30;
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        stroke(50);
        strokeWeight(1);
        const value = this.grid[row][col];
        fill(value === 0 ? 200 : 30);
        rect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  /** Clear completed lines and return the number of lines cleared. */
  clearLines() {
    let lines = 0;
    this.grid = this.grid.filter(row => {
      if (row.every(cell => cell !== 0)) {
        lines++;
        return false;
      }
      return true;
    });
    while (this.grid.length < this.height) {
      this.grid.unshift(Array(this.width).fill(0));
    }
    return lines;
  }

  /** Reset the board to empty. */
  reset() {
    this.grid = this.createGrid();
  }

  /**
   * Lock a piece into the board grid.
   * @param {Piece} piece The piece to lock
   */
  lockPiece(piece) {
    piece.lock();
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== 0) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (
            boardY >= 0 && boardY < this.height &&
            boardX >= 0 && boardX < this.width
          ) {
            this.grid[boardY][boardX] = 1; // You can use piece.color or 1
          }
        }
      }
    }
  }

  /**
   * Check if a piece collides with the board or other pieces.
   * @param {Piece} piece The piece to check
   * @returns {boolean} True if collision
   */
  collides(piece) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== 0) {
          const boardX = piece.x + x;
          const boardY = piece.y + y;
          if (
            boardX < 0 ||
            boardX >= this.width ||
            boardY < 0 ||
            boardY >= this.height ||
            this.grid[boardY][boardX] !== 0
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
}

export { Board };