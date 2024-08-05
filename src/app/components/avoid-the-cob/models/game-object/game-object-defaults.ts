import { scaledSize } from '../device-scale/device-scale';
import { GameColors } from '../game-colors/game-colors';
import { GameObjectSettings } from './game-object-setttings';
import { GameObjectShape } from './game-object-shape';
import { GameObjectType } from './game-object-type';

export class GameObjectDefaults {
  static cursor() {
    return {
      type: GameObjectType.Cursor,
      color: GameColors.White,
      size: scaledSize(20),
      speed: 0,
      shape: GameObjectShape.Circle,
      gravity: 0,
    };
  }

  static pea() {
    const size = scaledSize(20);
    const count = 10;
    const speed = 4;

    return {
      count: count,
      settings: new GameObjectSettings(GameObjectType.Pea, GameColors.Green, size, GameObjectShape.Circle, speed, 0),
    };
  }

  static corn() {
    const size = scaledSize(40);
    const count = 10;
    const speed = 4;

    return {
      count: count,
      settings: new GameObjectSettings(GameObjectType.Corn, GameColors.Yellow, size, GameObjectShape.Square, speed, 0),
    };
  }

  static powerUp() {
    const size = scaledSize(20);
    const speed = 20;

    return {
      count: 1,
      settings: new GameObjectSettings(GameObjectType.PowerUp, '#0055FF', size, GameObjectShape.Circle, speed, 0),
    };
  }

  static heart() {
    const size = scaledSize(20);
    const speed = 4;

    return {
      count: 1,
      settings: new GameObjectSettings(GameObjectType.Heart, GameColors.Red, size, GameObjectShape.Circle, speed, 0),
    };
  }

  static mob() {
    const size = scaledSize(20);
    const count = 20;
    const speed = 1;

    return {
      count: count,
      settings: new GameObjectSettings(GameObjectType.Corn, GameColors.Yellow, size, GameObjectShape.Square, speed, 0),
    };
  }
}
