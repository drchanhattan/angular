import { GameObjectBehaviour } from './game-object-behaviour';
import { GameObjectShape } from './game-object-shape';

export class GameObject {
  x!: number;
  y!: number;
  deltaX = 0;
  deltaY = 0;
  size!: number;
  colour!: string;
  behaviour!: GameObjectBehaviour;
  shape!: GameObjectShape;
  timestamp!: Date;
  destroyed = false;

  detectWallCollisionX(canvasW: number): boolean {
    return this.x + this.size / 2 > canvasW || this.x - this.size / 2 < 0;
  }

  detectWallCollisionY(canvasH: number): boolean {
    return this.y + this.size / 2 > canvasH || this.y - this.size / 2 < 0;
  }

  reverseDirection(x: boolean): void {
    x ? (this.deltaX = this.deltaX * -1) : (this.deltaY = this.deltaY * -1);
  }

  detectCollision(object: GameObject): boolean {
    if (this.shape === GameObjectShape.Rect) {
      // Arc to Rect Collision
      const distanceX = Math.abs(object.x - this.x);
      const distanceY = Math.abs(object.y - this.y);
      const halfSize = this.size / 2;

      // Check each side
      if (distanceX > halfSize + object.size) {
        return false;
      } else if (distanceY > halfSize + object.size) {
        return false;
      } else if (distanceX <= halfSize) {
        return true;
      } else if (distanceY <= halfSize) {
        return true;
      } else {
        // Check corners
        const dx = distanceX - halfSize;
        const dy = distanceY - halfSize;
        return dx * dx + dy * dy <= object.size * object.size;
      }
    } else {
      // Arc to Arc Collision
      const dx = object.x - this.x;
      const dy = object.y - this.y;
      const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      return distance <= object.size + this.size + 0.1;
    }
  }

  move(): void {
    // Move object by delta
    this.moveX();
    this.moveY();
  }

  moveX(): void {
    this.x = this.x + this.deltaX;
  }

  moveY(): void {
    this.y = this.y + this.deltaY;
  }

  setRandomDelta(x: boolean, y: boolean, speedMultiplier: number): void {
    if (x) {
      this.deltaX = (Math.random() - Math.random()) * speedMultiplier;
    }

    if (y) {
      this.deltaY = (Math.random() - Math.random()) * speedMultiplier;
    }
  }

  applyForce(x: boolean, force: number): void {
    x ? (this.x = this.x + force) : (this.y = this.y + force);
  }

  behaviourEquals(behaviour: GameObjectBehaviour): boolean {
    return this.behaviour === behaviour;
  }

  toggleBehaviour(behaviour: GameObjectBehaviour): void {
    this.behaviour = !this.behaviourEquals(behaviour) ? behaviour : GameObjectBehaviour.Default;
  }
}
