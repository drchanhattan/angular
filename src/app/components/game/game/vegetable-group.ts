import { GameObject, GameObjectBehaviour, GameObjectShape } from './game-object';

export interface VegetableSettings {
  color: string;
  size: number;
  count: number;
  speed: number;
  shape: GameObjectShape;
}

export class VegetableGroup {
  settings: VegetableSettings;
  objects: GameObject[] = [];

  constructor(settings: VegetableSettings) {
    this.settings = settings;
  }

  createVegetables() {
    for (let i = 0; i < this.settings.count; i++) {
      const xSpawn = Math.random() * window.innerWidth;
      const ySpawn = Math.random() * window.innerHeight;
      this.objects[i] = new GameObject(
        xSpawn,
        ySpawn,
        this.settings.size,
        this.settings.color,
        this.settings.shape,
        (Math.random() - Math.random()) * this.settings.speed,
        (Math.random() - Math.random()) * this.settings.speed,
      );
    }
  }

  editSettings(size: number, count: number, speed: number) {
    this.settings.size = size;
    this.settings.count = count;
    this.settings.speed = speed;
  }

  magnetise() {
    this.objects.forEach((objects) => objects.toggleBehaviour(GameObjectBehaviour.Magnetise));
  }

  repel() {
    this.objects.forEach((objects) => objects.toggleBehaviour(GameObjectBehaviour.Repel));
  }
}
