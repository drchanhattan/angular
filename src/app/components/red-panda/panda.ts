export class Panda {
  public deltaX: number;
  public deltaY: number;
  public isflipped = false;
  public isJumping = false;
  public jumpHeight = 10;
  public x: number;
  public y: number;
  public size: number;
  public speed = 5;

  constructor(deltaX: number, deltaY: number, posX: number, posY: number, size: number) {
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.x = posX;
    this.y = posY;
    this.size = size;
  }
}
