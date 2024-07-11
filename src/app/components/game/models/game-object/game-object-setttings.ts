import { GameObjectShape } from './game-object-shape';

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
