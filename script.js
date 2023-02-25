const canvas = document.getElementById("canvas");
const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Lime"];

class Block {
  constructor(canvas, col = 0, row = 0, blockSize = 10, colors = ["Blue"]) {
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.colors = colors;
    this.blockSize = blockSize;
    this.col = col;
    this.row = row;
  }

  drawSquare(color = "blue") {
    let x = this.col * this.blockSize;
    let y = this.row * this.blockSize;
    this.context.fillStyle = color;
    this.context.fillRect(x, y, this.blockSize, this.blockSize);
  }

  drawCircle(color = "lime") {
    let centerX = this.col * this.blockSize + this.blockSize / 2;
    let centerY = this.row * this.blockSize + this.blockSize / 2;
    this.context.fillStyle = color;
    this.circle(centerX, centerY, this.blockSize / 2, true);
  }

  circle(x, y, radius, fillCircle) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
      this.context.fill();
    } else {
      this.context.stroke();
    }
  }
}

class Apple {
  constructor(canvas) {
    this.block = new Block(canvas, 10, 10);
    this.canvas = canvas;
  }

  //   draw() {
  //     this.block.drawCircle("LimeGreen");
  //   }

  draw = function () {
    this.block.drawCircle("LimeGreen");
  };

  move() {
    let widthInBlocks = this.canvas.width / this.block.blockSize;
    let heightInBlocks = this.canvas.height / this.block.blockSize;
    const randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    const randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.block = new Block(canvas, randomCol, randomRow);
  }
}

class Snake {
  constructor(canvas) {
    this.segments = [
      new Block(canvas, 7, 5),
      new Block(canvas, 6, 5),
      new Block(canvas, 5, 5),
    ];
    this.canvas = canvas;
    this.direction = "right";
    this.nextDirection = "right";
  }

  draw = function () {
    for (var i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare("Blue");
    }
  };

  move = function () {
    let head = this.segments[0];
    let newHead;
    this.direction = this.nextDirection;

    if (this.direction === "right") {
      newHead = new Block(canvas, head.col + 1, head.row);
    } else if (this.direction === "down") {
      newHead = new Block(canvas, head.col, head.row + 1);
    } else if (this.direction === "left") {
      newHead = new Block(canvas, head.col - 1, head.row);
    } else if (this.direction === "up") {
      newHead = new Block(canvas, head.col, head.row - 1);
    }
    this.segments.unshift(newHead);

    this.segments.pop();
  };
}

// let sampleBlock = new Block(canvas, 25, 30);
// sampleBlock.drawSquare();

// let sampleCircleBlock = new Block(canvas, 25, 30);
// sampleCircleBlock.drawCircle();

let apple = new Apple(canvas);
apple.draw();

let snake = new Snake(canvas);
snake.draw();
