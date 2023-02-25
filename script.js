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




let sampleBlock = new Block(canvas, 25, 30);
sampleBlock.drawSquare();

let sampleCircleBlock = new Block(canvas, 25, 30);
sampleCircleBlock.drawCircle();

