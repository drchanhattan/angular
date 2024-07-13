import { Injectable } from '@angular/core';
import { CanvasService } from '../../services/canvas-service';
import { scaledSize } from '../device-scale/device-scale';
import { GameObject } from './game-object';
import { GameObjectSettings } from './game-object-setttings';
import { GameObjectShape } from './game-object-shape';
import { GameObjectType } from './game-object-type';

@Injectable({
  providedIn: 'root',
})
export class GameCursor {
  object = new GameObject(0, 0, this.defaultCursor);
  invincible: boolean = false;
  history: { x: number; y: number }[] = [];

  constructor(private canvasService: CanvasService) {
    const updatePosition = (x: number, y: number) => {
      const rect = this.canvasService.context.canvas.getBoundingClientRect();
      const newX = ((x - rect.left) / (rect.right - rect.left)) * window.innerWidth;
      const newY = ((y - rect.top) / (rect.bottom - rect.top)) * window.innerHeight;
      this.object.x = Math.min(Math.max(0, newX), window.innerWidth);
      this.object.y = Math.min(Math.max(0, newY), window.innerHeight);
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

    // Only keep the last 40 elements in history
    setInterval(() => {
      this.history = this.history.slice(-40);
    }, 150);
  }

  get defaultCursor(): GameObjectSettings {
    return {
      type: GameObjectType.Cursor,
      color: '#F5F5F5',
      size: scaledSize(6),
      speed: 0,
      shape: GameObjectShape.Circle,
    };
  }

  draw(context: CanvasRenderingContext2D, canvas: CanvasService): void {
    if (this.invincible) {
      this.trail(context, canvas);
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

      if (!vegetable.detectWallCollisionOnAxis('x', window.innerWidth)) {
        repel ? vegetable.applyForce('x', -dx) : vegetable.applyForce('x', dx);
      }

      if (!vegetable.detectWallCollisionOnAxis('y', window.innerHeight)) {
        repel ? vegetable.applyForce('y', -dy) : vegetable.applyForce('y', dy);
      }
    }
  }

  increaseDifficulty() {
    this.object.size = Math.max(this.object.size * 0.9, 10);
  }

  reset() {
    this.object.size = this.defaultCursor.size;
  }

  setInvincibility(enabled: boolean) {
    this.resetHistory();
    this.invincible = enabled;
  }

  private resetHistory() {
    this.history = [];
  }

  private trail(context: CanvasRenderingContext2D, canvas: CanvasService) {
    this.history.forEach((old) => {
      const settings = new GameObjectSettings(
        this.object.type,
        this.object.color,
        this.object.size,
        this.object.shape,
        0,
      );
      context.globalAlpha = 0.25;
      canvas.drawObject(context, new GameObject(old.x, old.y, settings));
      context.globalAlpha = 1;
    });
    this.history.push({ x: this.object.x, y: this.object.y });
  }
}
