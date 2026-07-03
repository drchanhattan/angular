import { GameObjectShape } from './game-object-shape';
import { GameObjectType } from './game-object-type';

export class GameObjectSettings {
  public type: GameObjectType;
  public color: string;
  public size: number;
  public shape: GameObjectShape;
  public speed: number;
  public gravity: number;
  public rotation?: number;

  constructor(
    type: GameObjectType,
    color: string,
    size: number,
    shape: GameObjectShape,
    speed: number,
    gravity: number,
    rotation?: number,
  ) {
    this.type = type;
    this.color = color;
    this.size = size;
    this.shape = shape;
    this.speed = speed;
    this.gravity = gravity;
    this.rotation = rotation;
  }
}
