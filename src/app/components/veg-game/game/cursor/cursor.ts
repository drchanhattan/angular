import { GameObject } from '../game-object/game-object';
import { GameObjectShape } from '../game-object/game-object-shape';
import { Canvas } from './../canvas/canvas';

export class Cursor extends GameObject {
  override colour = '#F5F5F5';
  history: { x: number; y: number }[] = [];
  trail!: boolean;

  track(context: CanvasRenderingContext2D, canvas: Canvas): void {
    document.addEventListener('mousemove', (event) => {
      const rect = context.canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.w;
      const y = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.h;
      this.x = Math.min(Math.max(0, x), canvas.w);
      this.y = Math.min(Math.max(0, y), canvas.h);
    });

    // Only keep the last 20 elements in history
    setInterval(() => {
      this.history = this.history.slice(-20);
    }, 150);
  }

  draw(context: CanvasRenderingContext2D, canvas: Canvas): void {
    if (this.trail) {
      this.#drawTrail(context, canvas);
    }

    canvas.drawObject(context, {
      x: this.x,
      y: this.y,
      size: this.size,
      colour: this.colour,
      shape: GameObjectShape.Arc,
    } as GameObject);
  }

  #drawTrail(context: CanvasRenderingContext2D, canvas: Canvas) {
    // Draw Trail
    this.history.forEach((old) => {
      context.globalAlpha = 0.1;
      canvas.drawObject(context, {
        x: old.x,
        y: old.y,
        size: this.size,
        colour: this.colour,
        shape: GameObjectShape.Arc,
      } as GameObject);
      context.globalAlpha = 1;
    });
    this.history.push({ x: this.x, y: this.y });
  }
}
