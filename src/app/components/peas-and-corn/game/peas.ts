import { GameObject } from './game-object';
import { GameObjectShape } from './game-object-shape';

export class Peas {
  public color = '#54ff58';
  public objects: GameObject[] = [];
  public count!: number;
  public size!: number;
  public speed!: number;

  public createNewPeas(canvasW: number, canvasH: number): void {
    for (let i = 0; i < this.count; i++) {
      const xSpawn = Math.random() * canvasW;
      const ySpawn = Math.random() * canvasH;

      this.objects[i] = new GameObject();
      this.objects[i].x = xSpawn;
      this.objects[i].y = ySpawn;
      this.objects[i].setRandomDelta(true, true, this.speed);
      this.objects[i].size = this.size;
      this.objects[i].shape = GameObjectShape.Arc;
      this.objects[i].colour = this.color;
    }
  }
}
