import { scaledSize, scaledSpeed } from '../device-scale/device-scale';
import { GameColor } from '../game-color/game-color';
import { GameObjectSettings } from './game-object-setttings';
import { GameObjectShape } from './game-object-shape';
import { GameObjectType } from './game-object-type';

export class GameObjectDefaults {
  static cursor() {
    return {
      type: GameObjectType.Cursor,
      color: GameColor.White,
      size: 0,
      speed: 0,
      shape: GameObjectShape.Circle,
      gravity: 0,
    };
  }

  static pea() {
    const size = scaledSize(20);
    const count = 10;
    const speed = scaledSpeed(3);

    return {
      count: count,
      settings: new GameObjectSettings(GameObjectType.Pea, GameColor.Green, size, GameObjectShape.Circle, speed, 0),
    };
  }

  static corn() {
    const size = scaledSize(40);
    const count = 10;
    const speed = scaledSpeed(3);

    return {
      count: count,
      settings: new GameObjectSettings(
        GameObjectType.Corn,
        GameColor.Yellow,
        size,
        GameObjectShape.Square,
        speed,
        0,
        1,
      ),
    };
  }

  static powerUp() {
    const size = scaledSize(20);
    const speed = scaledSpeed(15);

    return {
      count: 1,
      settings: new GameObjectSettings(GameObjectType.PowerUp, GameColor.Blue, size, GameObjectShape.Circle, speed, 0),
    };
  }

  static heart() {
    const size = scaledSize(20);
    const speed = scaledSpeed(3);

    return {
      count: 1,
      settings: new GameObjectSettings(GameObjectType.Heart, GameColor.Red, size, GameObjectShape.Circle, speed, 0),
    };
  }

  static mob() {
    const size = scaledSize(20);
    const count = 20;
    const speed = scaledSpeed(1.5);

    return {
      count: count,
      settings: new GameObjectSettings(GameObjectType.Corn, GameColor.Yellow, size, GameObjectShape.Square, speed, 0),
    };
  }
}
