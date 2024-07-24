import { GameObjectShape } from './game-object-shape';
import { GameObjectType } from './game-object-type';

export class GameObjectSettings {
  type: GameObjectType;
  color: string;
  size: number;
  shape: GameObjectShape;
  speed: number;
  gravity: number;

  constructor(
    type: GameObjectType,
    color: string,
    size: number,
    shape: GameObjectShape,
    speed: number,
    gravity: number,
  ) {
    this.type = type;
    this.color = color;
    this.size = size;
    this.shape = shape;
    this.speed = speed;
    this.gravity = gravity;
  }
}
