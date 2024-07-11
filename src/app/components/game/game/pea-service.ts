import { scaledCount, scaledSize, scaledSpeed } from './device-scale';
import { GameObject, GameObjectBehaviour, GameObjectShape } from './game-object';

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

  levelUp() {
    this.size = this.size * 0.9 < 10 ? 10 : this.size * 0.9;
    this.count = scaledCount(this.size, 3);
    this.speed = this.speed * 1.03;
  }

  reset() {
    this.size = scaledSize(8);
    this.count = scaledCount(this.size, 3);
    this.speed = scaledSpeed(this.size, 0.2);
  }

  magnetise() {
    this.peas.forEach((pea) => pea.toggleBehaviour(GameObjectBehaviour.Magnetise));
  }
}
