import { GameObject, GameObjectBehaviour, GameObjectSettings } from './game-object';

export class VegetableGroup {
  settings: GameObjectSettings;
  count: number;
  objects: GameObject[] = [];

  constructor(count: number, settings: GameObjectSettings) {
    this.count = count;
    this.settings = settings;
  }

  createVegetables() {
    for (let i = 0; i < this.count; i++) {
      const xSpawn = Math.random() * window.innerWidth;
      const ySpawn = Math.random() * window.innerHeight;
      const settings = new GameObjectSettings(
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
    this.count = count;
  }

  magnetise() {
    this.objects.forEach((objects) => objects.toggleBehaviour(GameObjectBehaviour.Magnetise));
  }

  repel() {
    this.objects.forEach((objects) => objects.toggleBehaviour(GameObjectBehaviour.Repel));
  }
}
export { GameObjectSettings };
