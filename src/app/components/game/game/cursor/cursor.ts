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

  magnetise(vegtable: GameObject, radiusMultiplier: number, canvas: Canvas, speed: number, repel = false): void {
    const obj = Object.assign({}, this);
    obj.size = obj.size * radiusMultiplier;

    if (vegtable.detectCollision(obj)) {
      let dx = this.x - vegtable.x;
      let dy = this.y - vegtable.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dx /= distance;
      dy /= distance;
      dx *= speed;
      dy *= speed;

      if (!vegtable.detectWallCollisionX(canvas.w)) {
        !repel ? vegtable.applyForce(true, dx) : vegtable.applyForce(true, -dx);
      }
      if (!vegtable.detectWallCollisionY(canvas.h)) {
        !repel ? vegtable.applyForce(false, dy) : vegtable.applyForce(false, -dy);
      }
    }
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
