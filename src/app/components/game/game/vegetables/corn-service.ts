import { GameObject } from '../game-object/game-object';
import { GameObjectShape } from '../game-object/game-object-shape';

export class CornService {
  scale = devicePixelRatio * (window.outerWidth / window.innerWidth);
  public color = '#ffc107';
  public corns: GameObject[] = [];
  public count!: number;
  public size!: number;
  public speed!: number;

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
    this.count = this.count * 1.1;
    this.size = this.size * 0.99;
    this.speed = this.speed * 1.01;
  }

  reset() {
    this.size = Math.round((this.scale ^ 50) * 0.8);
    this.count = Math.round(this.size / this.scale);
    this.speed = Math.round(this.size / this.scale) * 0.2;
  }
}
