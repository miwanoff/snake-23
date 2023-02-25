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
}

let sampleBlock = new Block(canvas, 20, 20);
sampleBlock.drawSquare();
