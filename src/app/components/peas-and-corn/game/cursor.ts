import { GameObject } from './game-object';
import { Canvas } from './canvas';
import { GameObjectShape } from './game-object-shape';

export class Cursor extends GameObject {
  public override colour = '#F5F5F5';
  public history: { x: number; y: number }[] = [];
  public trail!: boolean;

  public track(context: CanvasRenderingContext2D, canvas: Canvas): void {
    document.addEventListener('mousemove', (event) => {
      const rect = context.canvas.getBoundingClientRect();
      const rectX = rect.right - rect.left;
      const rectY = rect.bottom - rect.top;
      const x = ((event.clientX - rect.left) / rectX) * canvas.w;
      const y = ((event.clientY - rect.top) / rectY) * canvas.h;

      // Set cursor coordinates to the edge when cursor is out of bounds
      this.x = x < 0 ? this.size : x > canvas.w ? canvas.w - this.size : x;
      this.y = y < 0 ? this.size : y > canvas.h ? canvas.h - this.size : y;
    });

    // Cursor decay
    setInterval(() => {
      if (this.history.length) {
        this.history.splice(0, this.history.length - 20);
      }
    }, 150);
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.trail) {
      // Draw Trail
      this.history.forEach((old) => {
        context.globalAlpha = 0.1;
        Canvas.drawObject(context, {
          x: old.x,
          y: old.y,
          size: this.size,
          colour: this.colour,
          shape: GameObjectShape.Arc,
        } as GameObject);
        context.globalAlpha = 1;
      });
      // Push history
      this.history.push({ x: this.x, y: this.y });
    }

    // Draw cursor
    Canvas.drawObject(context, {
      x: this.x,
      y: this.y,
      size: this.size,
      colour: this.colour,
      shape: GameObjectShape.Arc,
    } as GameObject);
  }
}
