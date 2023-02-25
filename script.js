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

  equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
  };
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

  move = function (apple, game) {
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

    if (this.checkCollision(newHead)) {
      // game Over
      game.gameOver(canvas);

      // alert("Game over!");
      return;
    }

    this.segments.unshift(newHead);

    if (newHead.equal(apple.block)) {
      // score++;
      game.score++;
      apple.move();
    } else {
      this.segments.pop();
    }
  };

  checkCollision = function (head) {
    let widthInBlocks = this.canvas.width / head.blockSize;
    let heightInBlocks = this.canvas.height / head.blockSize;
    let leftCollision = head.col === 0;
    let topCollision = head.row === 0;
    let rightCollision = head.col === widthInBlocks - 1;
    let bottomCollision = head.row === heightInBlocks - 1;
    let wallCollision =
      leftCollision || topCollision || rightCollision || bottomCollision;
    let selfCollision = false;
    for (let i = 0; i < this.segments.length; i++) {
      if (head.equal(this.segments[i])) {
        selfCollision = true;
      }
    }
    return wallCollision || selfCollision;
  };

  setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
      return;
    } else if (this.direction === "right" && newDirection === "left") {
      return;
    } else if (this.direction === "down" && newDirection === "up") {
      return;
    } else if (this.direction === "left" && newDirection === "right") {
      return;
    }
    this.nextDirection = newDirection;
  };
}

class Game {
  intervalId;
  constructor(canvas) {
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
    this.score = 0;
    this.directions = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
    };
    this.apple = new Apple(canvas);
    this.snake = new Snake(canvas);
  }

  drawBorder = function (blockSize = 10) {
    this.context.fillStyle = "Gray";
    this.context.fillRect(0, 0, this.canvas.width, blockSize);
    this.context.fillRect(
      0,
      this.canvas.height - blockSize,
      this.canvas.width,
      blockSize
    );
    this.context.fillRect(0, 0, blockSize, this.canvas.height);
    this.context.fillRect(
      this.canvas.width - blockSize,
      0,
      blockSize,
      this.canvas.height
    );
  };

  drawScore = function (blockSize = 10) {
    this.context.font = "20px Courier";
    this.context.fillStyle = "Black";
    this.context.textAlign = "left";
    this.context.textBaseline = "top";
    this.context.fillText("Score: " + this.score, blockSize, blockSize);
  };

  gameOver = function (canvas) {
    let context = canvas.getContext("2d");
    clearInterval(this.intervalId);
    context.font = "60px Courier";
    context.fillStyle = "Black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Game over!", canvas.width / 2, canvas.height / 2);
  };

  go() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawScore();
    this.snake.move(this.apple, this);
    this.snake.draw();
    this.apple.draw();
    this.drawBorder();
  }

  start() {
    this.intervalId = setInterval(this.go.bind(this), 200);
    // Задаємо оброблювач події keydown
    addEventListener("keydown", (event) => {
      let newDirection = this.directions[event.keyCode];
      if (newDirection !== undefined) {
        this.snake.setDirection(newDirection);
      }
    });
  }

  
}

// let sampleBlock = new Block(canvas, 25, 30);
// sampleBlock.drawSquare();

// let sampleCircleBlock = new Block(canvas, 25, 30);
// sampleCircleBlock.drawCircle();

// let apple = new Apple(canvas);
// apple.draw();

// let snake = new Snake(canvas);
// snake.draw();

// let game = new Game(canvas);
// game.drawBorder();
// game.drawScore();

let game = new Game(canvas);
game.start();
