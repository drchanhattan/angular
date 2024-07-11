export enum GameObjectBehaviour {
  Default = 1,
  Magnetise = 2,
  Repel = 2,
}

export enum GameObjectShape {
  Rect = 1,
  Arc = 2,
}

export class GameObjectSettings {
  color: string;
  size: number;
  shape: GameObjectShape;
  speed: number;

  constructor(color: string, size: number, shape: GameObjectShape, speed: number) {
    this.color = color;
    this.size = size;
    this.shape = shape;
    this.speed = speed;
  }
}

export class GameObject {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: GameObjectShape;
  deltaX: number;
  deltaY: number;
  behaviour!: GameObjectBehaviour;
  timestamp!: Date;
  destroyed = false;

  constructor(x: number, y: number, settings: GameObjectSettings) {
    this.x = x;
    this.y = y;
    this.size = settings.size;
    this.color = settings.color;
    this.shape = settings.shape;
    this.deltaX = settings.speed ? (Math.random() - Math.random()) * settings.speed : 0;
    this.deltaY = settings.speed ? (Math.random() - Math.random()) * settings.speed : 0;
  }

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
