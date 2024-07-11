import { scaledCount, scaledSize, scaledSpeed } from './device-scale';
import { GameObject, GameObjectBehaviour, GameObjectShape } from './game-object';

export class CornService {
  scale = devicePixelRatio * (window.outerWidth / window.innerWidth);
  color = '#ffc107';
  corns: GameObject[] = [];
  count!: number;
  size!: number;
  speed!: number;

  createNewCorn(canvasW: number, canvasH: number): void {
    for (let i = 0; i < this.count; i++) {
      const xSpawn = Math.random() * canvasW;
      const ySpawn = Math.random() * canvasH;

      this.corns[i] = new GameObject();
      this.corns[i].x = xSpawn;
      this.corns[i].y = ySpawn;
      this.corns[i].setRandomDelta(true, true, this.speed);
      this.corns[i].size = this.size;
      this.corns[i].shape = GameObjectShape.Rect;
      this.corns[i].colour = this.color;
    }
  }

  levelUp() {
    this.size = this.size * 0.99;
    this.count = this.count * 1.1;
    this.speed = this.speed * 1.01;
  }

  reset() {
    this.size = scaledSize(12);
    this.count = scaledCount(this.size, 6);
    this.speed = scaledSpeed(this.size, 0.2);
  }

  repel() {
    this.corns.forEach((corn) => corn.toggleBehaviour(GameObjectBehaviour.Repel));
  }
}
