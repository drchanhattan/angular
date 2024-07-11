import { Injectable } from '@angular/core';
import { CanvasService } from './canvas-service';
import { scaledSize } from './device-scale';
import { GameObject, GameObjectShape } from './game-object';

@Injectable({
  providedIn: 'root',
})
export class GameCursor {
  object = new GameObject(0, 0, scaledSize(8), '#F5F5F5', GameObjectShape.Arc);
  history: { x: number; y: number }[] = [];
  trail!: boolean;

  constructor(private canvasService: CanvasService) {
    const updatePosition = (x: number, y: number) => {
      const rect = this.canvasService.context.canvas.getBoundingClientRect();
      const newX = ((x - rect.left) / (rect.right - rect.left)) * this.canvasService.screenW;
      const newY = ((y - rect.top) / (rect.bottom - rect.top)) * this.canvasService.screenH;
      this.object.x = Math.min(Math.max(0, newX), this.canvasService.screenW);
      this.object.y = Math.min(Math.max(0, newY), this.canvasService.screenH);
    };

    document.addEventListener('mousemove', (event) => {
      updatePosition(event.clientX, event.clientY);
    });

    const touchHandler = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
        if (event.target === this.canvasService.context.canvas) {
          event.preventDefault();
        }
      }
    };

    document.addEventListener('touchmove', touchHandler, { passive: false });
    document.addEventListener('touchstart', touchHandler, { passive: false });

    // Only keep the last 20 elements in history
    setInterval(() => {
      this.history = this.history.slice(-20);
    }, 150);
  }

  draw(context: CanvasRenderingContext2D, canvas: CanvasService): void {
    if (this.trail) {
      this.#trail(context, canvas);
    }

    canvas.drawObject(context, this.object);
  }

  toggle() {
    const canvasClass = this.canvasService.canvasEle.nativeElement.classList;
    canvasClass.toggle('cursor-none');
  }

  magnetise(vegetable: GameObject, radiusMultiplier: number, speed: number, repel: boolean): void {
    const obj = Object.assign({}, this.object);
    obj.size = obj.size * radiusMultiplier;

    if (vegetable.detectCollision(obj)) {
      let dx = this.object.x - vegetable.x;
      let dy = this.object.y - vegetable.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dx /= distance;
      dy /= distance;
      dx *= speed;
      dy *= speed;

      if (!vegetable.detectWallCollisionX(this.canvasService.screenW)) {
        repel ? vegetable.applyForce(true, -dx) : vegetable.applyForce(true, dx);
      }

      if (!vegetable.detectWallCollisionY(this.canvasService.screenH)) {
        repel ? vegetable.applyForce(false, -dy) : vegetable.applyForce(false, dy);
      }
    }
  }

  increaseDifficulty() {
    this.object.size = Math.max(this.object.size * 0.9, 10);
  }

  reset() {
    this.object.size = scaledSize(8);
  }

  resetHistory() {
    this.history = [];
  }

  toggleTrail() {
    this.trail = !this.trail;
  }

  #trail(context: CanvasRenderingContext2D, canvas: CanvasService) {
    this.history.forEach((old) => {
      context.globalAlpha = 0.1;
      canvas.drawObject(context, new GameObject(old.x, old.y, this.object.size, this.object.color, this.object.shape));
      context.globalAlpha = 1;
    });
    this.history.push({ x: this.object.x, y: this.object.y });
  }
}
