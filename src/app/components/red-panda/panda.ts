export class Panda {
  deltaX: number;
  deltaY: number;
  isflipped = false;
  isJumping = false;
  jumpHeight = 10;
  x: number;
  y: number;
  size: number;
  speed = 5;

  constructor(deltaX: number, deltaY: number, posX: number, posY: number, size: number) {
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.x = posX;
    this.y = posY;
    this.size = size;
  }
}
