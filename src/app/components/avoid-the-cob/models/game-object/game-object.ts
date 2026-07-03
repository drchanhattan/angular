import { GameObjectBehaviour } from './game-object-behaviour';
import { GameObjectSettings } from './game-object-setttings';
import { GameObjectShape } from './game-object-shape';
import { GameObjectType } from './game-object-type';

export class GameObject {
  public type: GameObjectType;
  public x: number;
  public y: number;
  public size: number;
  public color: string;
  public shape: GameObjectShape;
  public deltaX: number;
  public deltaY: number;
  public gravity: number;
  public behaviours: GameObjectBehaviour[];
  public expiration?: number;
  public rotation?: number;

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
    this.rotation = settings.rotation;
    this.behaviours = [GameObjectBehaviour.Default];
  }

  public get isPea() {
    return this.type === GameObjectType.Pea;
  }

  public get isCorn() {
    return this.type === GameObjectType.Corn;
  }

  public get isPowerUp() {
    return this.type === GameObjectType.PowerUp;
  }

  public get isHeart() {
    return this.type === GameObjectType.Heart;
  }

  public get isDestroyed() {
    return this.behaviourIncludes(GameObjectBehaviour.Destroyed);
  }

  public get isWithinViewport() {
    return this.x >= 0 && this.x <= window.innerWidth && this.y >= 0 && this.y <= window.innerHeight;
  }

  // Movement and Positioning
  // ==============================

  public move() {
    this.x += this.deltaX;
    this.y += this.deltaY;
  }

  public applyForce(axis: 'x' | 'y', force: number) {
    this[axis] += force;
  }

  // Collision Detection
  // ==============================

  public detectCollision(object: GameObject): boolean {
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

  public detectWallCollisionOnAxis(axis: 'x' | 'y', canvasSize: number): boolean {
    const position = this[axis];
    return position + this.size / 2 > canvasSize || position - this.size / 2 < 0;
  }

  // Wall Collision
  // ==============================

  public processWallCollision() {
    if (this.detectWallCollisionOnAxis('x', window.innerWidth)) {
      this.processWallCollisionOnAxis('x', window.innerWidth / 2);
    }

    if (this.detectWallCollisionOnAxis('y', window.innerHeight)) {
      this.processWallCollisionOnAxis('y', window.innerHeight / 2);
    }
  }

  private processWallCollisionOnAxis(axis: 'x' | 'y', centre: number) {
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

  public behaviourIncludes(behaviour: GameObjectBehaviour): boolean {
    return this.behaviours.includes(behaviour);
  }

  public toggleBehaviour(behaviour: GameObjectBehaviour) {
    if (this.behaviourIncludes(behaviour)) {
      this.behaviours = this.behaviours.filter((b) => b !== behaviour);
      if (!this.behaviours.length) {
        this.behaviours = [GameObjectBehaviour.Default];
      }
    } else {
      this.behaviours = [...this.behaviours, behaviour];
    }
  }

  public destroy() {
    this.toggleBehaviour(GameObjectBehaviour.Destroyed);
  }
}
