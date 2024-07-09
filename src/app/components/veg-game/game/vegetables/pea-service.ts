import { GameObject } from '../game-object/game-object';
import { GameObjectShape } from '../game-object/game-object-shape';

export class PeaService {
  color = '#54ff58';
  peas: GameObject[] = [];
  count!: number;
  size!: number;
  speed!: number;

  createNewPeas(canvasW: number, canvasH: number): void {
    for (let i = 0; i < this.count; i++) {
      const xSpawn = Math.random() * canvasW;
      const ySpawn = Math.random() * canvasH;

      this.peas[i] = new GameObject();
      this.peas[i].x = xSpawn;
      this.peas[i].y = ySpawn;
      this.peas[i].setRandomDelta(true, true, this.speed);
      this.peas[i].size = this.size;
      this.peas[i].shape = GameObjectShape.Arc;
      this.peas[i].colour = this.color;
    }
  }
}
