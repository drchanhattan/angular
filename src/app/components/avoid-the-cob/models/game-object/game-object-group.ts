import { GameObject } from './game-object';
import { GameObjectBehaviour } from './game-object-behaviour';
import { GameObjectSettings } from './game-object-setttings';

export class GameObjectGroup {
  settings: GameObjectSettings;
  count: number;
  objects: GameObject[] = [];

  constructor(count: number, settings: GameObjectSettings) {
    this.count = count;
    this.settings = settings;
  }

  createObjects() {
    for (let i = 0; i < this.count; i++) {
      const xSpawn = Math.random() * window.innerWidth;
      const ySpawn = Math.random() * window.innerHeight;
      const settings = new GameObjectSettings(
        this.settings.type,
        this.settings.color,
        this.settings.size,
        this.settings.shape,
        this.settings.speed,
      );
      this.objects[i] = new GameObject(xSpawn, ySpawn, settings);
    }
  }

  editSettings(size: number, speed: number, count: number) {
    this.settings.size = size;
    this.settings.speed = speed;
    this.count = Math.round(count);
  }

  setBehaviour(behaviour: GameObjectBehaviour) {
    this.objects.forEach((object) => object.toggleBehaviour(behaviour));
  }

  destroyObjects() {
    this.objects = [];
  }
}
