import { Injectable } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { CanvasService } from './canvas-service';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  object = new GameObject(0, 0, GameObjectDefaults.cursor());
  invincible: boolean = false;
  private history: { x: number; y: number }[] = [];
  private lastTouch: { x: number; y: number } | null = null;

  constructor(private canvasService: CanvasService) {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    isTouchDevice ? this.handleTouch() : this.handleMouse();

    this.storeHistory();
  }

  private updatePosition(x: number, y: number) {
    const rect = this.canvasService.context.canvas.getBoundingClientRect();
    const newX = ((x - rect.left) / (rect.right - rect.left)) * window.innerWidth;
    const newY = ((y - rect.top) / (rect.bottom - rect.top)) * window.innerHeight;
    this.object.x = Math.min(Math.max(0, newX), window.innerWidth);
    this.object.y = Math.min(Math.max(0, newY), window.innerHeight);
  }

  private handleMouse() {
    document.addEventListener('mousemove', (event) => {
      this.updatePosition(event.clientX, event.clientY);
    });
  }

  private handleTouch() {
    const touchHandler = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        if (this.lastTouch) {
          const deltaX = touchX - this.lastTouch.x;
          const deltaY = touchY - this.lastTouch.y;

          this.object.x = Math.min(Math.max(0, this.object.x + deltaX), window.innerWidth);
          this.object.y = Math.min(Math.max(0, this.object.y + deltaY), window.innerHeight);
        }

        this.lastTouch = { x: touchX, y: touchY };

        if (event.target === this.canvasService.context.canvas) {
          event.preventDefault();
        }
      }
    };

    const touchEndHandler = () => {
      this.lastTouch = null;
    };

    document.addEventListener('touchmove', touchHandler, { passive: false });
    document.addEventListener('touchstart', touchHandler, { passive: false });
    document.addEventListener('touchend', touchEndHandler);
    document.addEventListener('touchcancel', touchEndHandler);
  }

  private storeHistory() {
    setInterval(() => {
      this.history = this.history.slice(-40);
    }, 150);
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

  reset() {
    this.object.size = GameObjectDefaults.cursor().size;
  }

  setInvincibility(enabled: boolean) {
    this.resetHistory();
    this.invincible = enabled;
  }

  blink(color: string, blinks: number, interval: number) {
    const changeColor = (color: string, delay: number | undefined) => {
      setTimeout(() => {
        this.object.color = color;
      }, delay);
    };

    for (let i = 0; i < blinks; i++) {
      changeColor(color, interval * (2 * i));
      changeColor(GameObjectDefaults.cursor().color, interval * (2 * i + 1));
    }
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
