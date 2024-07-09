import { GameObject } from '../game-object/game-object';
import { GameObjectShape } from '../game-object/game-object-shape';

export class CornService {
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
}
