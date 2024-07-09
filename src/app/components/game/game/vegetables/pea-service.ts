import { GameObject } from '../game-object/game-object';
import { GameObjectBehaviour } from '../game-object/game-object-behaviour';
import { GameObjectShape } from '../game-object/game-object-shape';

export class PeaService {
  scale = devicePixelRatio * (window.outerWidth / window.innerWidth);
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
    this.count = Math.round(this.size / this.scale);
    this.size = this.size * 0.99;
    this.speed = this.speed * 1.03;
  }

  reset() {
    this.size = Math.round((this.scale ^ 50) * 0.5);
    this.count = Math.round(this.size / this.scale);
    this.speed = Math.round(this.size / this.scale) * 0.2;
  }

  magnetise() {
    this.peas.forEach((pea) => pea.toggleBehaviour(GameObjectBehaviour.Magnetise));
  }
}
