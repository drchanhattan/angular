import { GameObjectBehaviour } from './game-object-behaviour';
import { GameObjectSettings } from './game-object-setttings';
import { GameObjectShape } from './game-object-shape';
import { GameObjectType } from './game-object-type';

export class GameObject {
  type: GameObjectType;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: GameObjectShape;
  deltaX: number;
  deltaY: number;
  gravity: number;
  behaviours: GameObjectBehaviour[];
  timestamp: Date;

  constructor(x: number, y: number, settings: GameObjectSettings) {
    this.x = x;
    this.y = y;
    this.type = settings.type;
    this.size = settings.size;
    this.color = settings.color;
    this.shape = settings.shape;
    this.deltaX = settings.speed ? (Math.random() - Math.random()) * settings.speed : 0;
    this.deltaY = settings.speed ? (Math.random() - Math.random()) * settings.speed : 0;
    this.gravity = settings.gravity ?? 0;
    this.behaviours = [GameObjectBehaviour.Default];
    this.timestamp = new Date();
  }

  // Getters
  // ==============================

  get isPea() {
    return this.type === GameObjectType.Pea;
  }

  get isCorn() {
    return this.type === GameObjectType.Corn;
  }

  get isPowerUp() {
    return this.type === GameObjectType.PowerUp;
  }

  get isHeart() {
    return this.type === GameObjectType.Heart;
  }

  get isDestroyed() {
    return this.behaviourIncludes(GameObjectBehaviour.Destroyed);
  }

  get isWithinViewport() {
    return this.x >= 0 && this.x <= window.innerWidth && this.y >= 0 && this.y <= window.innerHeight;
  }

  // Movement and Positioning
  // ==============================

  move() {
    this.x += this.deltaX;
    this.y += this.deltaY;
  }

  applyForce(axis: 'x' | 'y', force: number) {
    this[axis] += force;
  }

  magnetise(
    object: GameObject,
    radiusMultiplier: number,
    speed: number,
    repel: boolean,
    collisionEnabled = true,
  ): void {
    const obj = Object.assign({}, this);
    obj.size = obj.size * radiusMultiplier;

    if (object.detectCollision(obj)) {
      let dx = this.x - object.x;
      let dy = this.y - object.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dx /= distance;
      dy /= distance;
      dx *= speed;
      dy *= speed;

      if (!object.detectWallCollisionOnAxis('x', window.innerWidth) || !collisionEnabled) {
        repel ? object.applyForce('x', -dx) : object.applyForce('x', dx);
      }

      if (!object.detectWallCollisionOnAxis('y', window.innerHeight) || !collisionEnabled) {
        repel ? object.applyForce('y', -dy) : object.applyForce('y', dy);
      }
    }
  }

  // Collision Detection
  // ==============================

  detectCollision(object: GameObject): boolean {
    return this.shape === GameObjectShape.Square
      ? this.detectRectCollision(object)
      : this.detectCircleCollision(object);
  }

  private detectRectCollision(object: GameObject): boolean {
    const distanceX = Math.abs(object.x - this.x);
    const distanceY = Math.abs(object.y - this.y);
    const halfSize = this.size / 2;

    if (distanceX > halfSize + object.size || distanceY > halfSize + object.size) {
      return false;
    }

    if (distanceX <= halfSize || distanceY <= halfSize) {
      return true;
    }

    const dx = distanceX - halfSize;
    const dy = distanceY - halfSize;
    return dx * dx + dy * dy <= object.size * object.size;
  }

  private detectCircleCollision(object: GameObject): boolean {
    const dx = object.x - this.x;
    const dy = object.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= object.size + this.size + 0.1;
  }

  // Wall Collision Detection
  // ==============================

  handleWallCollisions() {
    if (this.detectWallCollisionOnAxis('x', window.innerWidth)) {
      this.handleWallCollisionOnAxis('x', window.innerWidth / 2);
    }

    if (this.detectWallCollisionOnAxis('y', window.innerHeight)) {
      this.handleWallCollisionOnAxis('y', window.innerHeight / 2);
    }
  }

  detectWallCollisionOnAxis(axis: 'x' | 'y', canvasSize: number): boolean {
    const position = this[axis];
    return position + this.size / 2 > canvasSize || position - this.size / 2 < 0;
  }

  private handleWallCollisionOnAxis(axis: 'x' | 'y', centre: number) {
    const sign = Math.sign(this[`delta${axis.toUpperCase()}` as 'deltaX' | 'deltaY']);
    const position = this[axis];
    if ((position < centre && sign === -1) || (position > centre && sign === 1)) {
      this.reverseDirection(axis);
    }
  }

  private reverseDirection(axis: 'x' | 'y') {
    this[`delta${axis.toUpperCase()}` as 'deltaX' | 'deltaY'] *= -1;
  }

  // Behaviour Handling
  // ==============================

  behaviourIncludes(behaviour: GameObjectBehaviour): boolean {
    return this.behaviours.includes(behaviour);
  }

  toggleBehaviour(behaviour: GameObjectBehaviour) {
    if (this.behaviourIncludes(behaviour)) {
      this.behaviours = this.behaviours.filter((b) => b !== behaviour);
      if (!this.behaviours.length) {
        this.behaviours = [GameObjectBehaviour.Default];
      }
    } else {
      this.behaviours = [...this.behaviours, behaviour];
    }
  }

  destroy() {
    this.toggleBehaviour(GameObjectBehaviour.Destroyed);
  }
}
