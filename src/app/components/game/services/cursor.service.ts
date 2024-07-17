import { Injectable } from '@angular/core';
import { ThemeSelectorService } from '../../theme-selector/theme-selector-service';
import { scaledSize } from '../models/device-scale/device-scale';
import { GameColors } from '../models/game-colors/game-colors';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectShape } from '../models/game-object/game-object-shape';
import { GameObjectType } from '../models/game-object/game-object-type';
import { CanvasService } from './canvas-service';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  object = new GameObject(0, 0, this.defaultCursor);
  invincible: boolean = false;
  private history: { x: number; y: number }[] = [];
  private lastTouch: { x: number; y: number } | null = null;
  private currentTheme!: 'light-theme' | 'dark-theme';

  constructor(
    private themeService: ThemeSelectorService,
    private canvasService: CanvasService,
  ) {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    isTouchDevice ? this.handleTouch() : this.handleMouse();

    this.storeHistory();

    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.object.color = theme === 'dark-theme' ? GameColors.White : GameColors.Black;
    });
  }

  get defaultCursor(): GameObjectSettings {
    return {
      type: GameObjectType.Cursor,
      color: this.currentTheme === 'dark-theme' ? GameColors.White : GameColors.Black,
      size: scaledSize(7),
      speed: 0,
      shape: GameObjectShape.Circle,
    };
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
    this.object.size = this.defaultCursor.size;
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
      changeColor(this.defaultCursor.color, interval * (2 * i + 1));
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
