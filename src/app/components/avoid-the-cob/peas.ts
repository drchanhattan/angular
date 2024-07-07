import { GameObject } from './game/game-object';
import { GameObjectShape } from './game/game-object-shape';
import { Canvas } from './game/canvas';

export class Peas {
  public color = '#54ff58';
  public objects: GameObject[] = [];
  public count!: number;
  public size!: number;
  public speed!: number;

  public createNewPeas(canvas: Canvas): void {
    for (let i = 0; i < this.count; i++) {
      this.objects[i] = new GameObject();
      this.objects[i].x = Math.floor(Math.random() * canvas.w);
      this.objects[i].y = Math.floor(Math.random() * canvas.h);
      this.objects[i].setRandomDelta(true, true, this.speed);
      this.objects[i].size = this.size;
      this.objects[i].shape = GameObjectShape.Arc;
      this.objects[i].colour = this.color;
    }
  }
}
