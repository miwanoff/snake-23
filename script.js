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
}
