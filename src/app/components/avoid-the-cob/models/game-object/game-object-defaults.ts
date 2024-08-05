import { scaledCount, scaledSize, scaledSpeed } from '../device-scale/device-scale';
import { GameColors } from '../game-colors/game-colors';
import { GameObjectSettings } from './game-object-setttings';
import { GameObjectShape } from './game-object-shape';
import { GameObjectType } from './game-object-type';

export class GameObjectDefaults {
  static cursor() {
    return {
      type: GameObjectType.Cursor,
      color: GameColors.White,
      size: scaledSize(6),
      speed: 0,
      shape: GameObjectShape.Circle,
      gravity: 0,
    };
  }

  static pea() {
    const size = scaledSize(8);
    const count = scaledCount(size, 2.5);
    const speed = scaledSpeed(size, 0.15);

    return {
      count: count,
      settings: new GameObjectSettings(GameObjectType.Pea, GameColors.Green, size, GameObjectShape.Circle, speed, 0),
    };
  }

  static corn() {
    const size = scaledSize(14);
    const count = scaledCount(size, 3);
    const speed = scaledSpeed(size, 0.15);

    return {
      count: count,
      settings: new GameObjectSettings(GameObjectType.Corn, GameColors.Yellow, size, GameObjectShape.Square, speed, 0),
    };
  }

  static powerUp() {
    const size = scaledSize(8);
    const speed = scaledSpeed(size, scaledSize(0.5));

    return {
      count: 1,
      settings: new GameObjectSettings(GameObjectType.PowerUp, '#0055FF', size, GameObjectShape.Circle, speed, 0),
    };
  }

  static heart() {
    const size = scaledSize(8);
    const speed = scaledSpeed(size, 0.25);

    return {
      count: 1,
      settings: new GameObjectSettings(GameObjectType.Heart, GameColors.Red, size, GameObjectShape.Circle, speed, 0),
    };
  }

  static mob() {
    const size = scaledSize(8);
    const count = scaledCount(size, 6);
    const speed = scaledSpeed(size, 0.1);

    return {
      count: count,
      settings: new GameObjectSettings(GameObjectType.Corn, GameColors.Yellow, size, GameObjectShape.Square, speed, 0),
    };
  }
}
