import state from "./state.js";

/**
 * Tetris Piece class.
 * Handles shape, movement, drawing, and collision.
 */
class Piece {
  static Colors = [
    "grey", "red", "green", "blue", "yellow", "purple", "cyan", "orange", "pink"
  ];
  static Shapes = {
    I: [
      [1, 1, 1, 1]
    ],
    J: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    L: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    O: [
      [1, 1],
      [1, 1]
    ],
    S: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    T: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    Z: [
      [1, 1, 0],
      [0, 1, 1]
    ]
  };

  constructor() {
    const shapeKey = this.getRandomShapeKey();
    this.shape = Piece.Shapes[shapeKey].map(row => [...row]);
    this.color = Piece.Colors[Math.floor(Math.random() * Piece.Colors.length)];
    this.cellSize = 30;
    this.speed = 1;
    this.x = Math.floor(state.board.width / 2) - Math.floor(this.shape[0].length / 2);
    this.y = 0;
    this.dropStartY = this.y;
    this.dropStartTime = state.time;
  }

  /** Get a random shape key. */
  getRandomShapeKey() {
    const shapes = Object.keys(Piece.Shapes);
    return shapes[Math.floor(Math.random() * shapes.length)];
  }

  /** Draw the piece on the canvas. */
  draw() {
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col] === 1) {
          fill(this.color);
          rect(
            (this.x + col) * this.cellSize,
            (this.y + row) * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }

  /**
   * Move the piece down by one cell if possible.
   * Returns true if the piece should lock (cannot move down).
   */
  update() {
    this.y += this.speed / state.FPS * state.speed;
    const roundedY = Math.floor(this.y);

    // Check for collision if moved down
    const testPiece = { ...this, y: roundedY + 1 };
    if (state.board.collides(testPiece)) {
      this.y = roundedY;
      return true; // Lock the piece
    }
    // If piece is at the bottom
    if (roundedY + this.shape.length > state.board.height) {
      this.y = state.board.height - this.shape.length;
      return true;
    }
    // this.y = roundedY;
    return false;
  }

  /** Lock the piece (stop movement). */
  lock() {
    this.speed = 0;
  }

  /** Move piece left if possible. */
  moveLeft() {
    this.x--;
    if (state.board.collides(this)) {
      this.x++; // Undo move if collision
    }
  }

  /** Move piece right if possible. */
  moveRight() {
    this.x++;
    if (state.board.collides(this)) {
      this.x--; // Undo move if collision
    }
  }

  /** Move piece down if possible. */
  moveDown() {
    this.y++;
    if (state.board.collides(this)) {
      this.y--;
      return true;
    }
    return false;
  }

  /** Hard drop to the bottom. */
  moveToBottom() {
    this.speed = 50; // Set speed to maximum for hard drop
    while (!state.board.collides(this)) {
      this.y++;
    }
    this.y--;
    this.speed = 1; // Reset speed 
  }

  /** Rotate the piece clockwise if possible, with basic wall kick. */
  rotate() {
    const newShape = [];
    for (let col = 0; col < this.shape[0].length; col++) {
      newShape[col] = [];
      for (let row = this.shape.length - 1; row >= 0; row--) {
        newShape[col][this.shape.length - 1 - row] = this.shape[row][col];
      }
    }
    const oldShape = this.shape;
    this.shape = newShape;
    // Try normal rotation
    if (state.board.collides(this)) {
      // Try wall kick left
      this.x--;
      if (state.board.collides(this)) {
        // Try wall kick right
        this.x += 2;
        if (state.board.collides(this)) {
          // Revert all if still colliding
          this.x--;
          this.shape = oldShape;
        }
      }
    }
  }

  /** Calculate the drop speed for scoring. */
  lastDropSpeed() {
    return Math.max(1, state.level * state.speed);
  }
}

export { Piece };