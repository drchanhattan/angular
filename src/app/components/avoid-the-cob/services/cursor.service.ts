import { Injectable } from '@angular/core';
import { GameColor } from '../models/game-color/game-color';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { CanvasService } from './canvas-service';
import { DeviceService } from './device-service';
import { ParticleService } from './particle-service';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  object = new GameObject(0, 0, GameObjectDefaults.cursor());
  invincible: boolean = false;
  collisionEnabled: boolean = true;
  randomColor!: GameColor;
  private lastTouch: { x: number; y: number } | null = null;

  constructor(
    private canvasService: CanvasService,
    private deviceService: DeviceService,
    private particleService: ParticleService,
  ) {
    this.deviceService.isTouchScreen ? this.handleTouch() : this.handleMouse();
    setInterval(() => this.randomizeColor(), 20);
  }

  draw() {
    if (this.invincible) {
      this.halo(this.randomColor, 1.25, false);
    }

    this.canvasService.drawObject(this.canvasService.context, this.object);
  }

  show() {
    this.canvasService.canvasEle.classList.remove('cursor-none');
  }

  hide() {
    this.canvasService.canvasEle.classList.add('cursor-none');
  }

  reset() {
    this.object.size = GameObjectDefaults.cursor().size;
  }

  disableCollision(duration: number) {
    this.collisionEnabled = false;
    setTimeout(() => (this.collisionEnabled = true), duration);
  }

  setInvincibility(enabled: boolean) {
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

  halo(color: GameColor, scale = 1.5, blink = true, pulse = false) {
    const blinkActive = blink && Math.floor(Date.now() / 50) % 2 === 0;
    const size = this.object.size * (blinkActive ? 0 : pulse ? this.pulseSize(scale) : scale);
    const canvas = this.canvasService;
    const context = this.canvasService.context;
    const settings = new GameObjectSettings(this.object.type, color, size, this.object.shape, 0, 0);

    canvas.drawObject(context, new GameObject(this.object.x, this.object.y, settings));
  }

  particles(color: GameColor, count = 0.25, speed = 0.5) {
    // Reduce particles by percentage
    if (Math.random() < count) {
      const blueCursor = Object.assign({}, this.object);
      blueCursor.color = color;
      this.particleService.create(blueCursor, 1, speed);
    }
  }

  private updatePosition(x: number, y: number) {
    const canvas = this.canvasService.context?.canvas;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const newX = ((x - rect.left) / (rect.right - rect.left)) * window.innerWidth;
      const newY = ((y - rect.top) / (rect.bottom - rect.top)) * window.innerHeight;
      this.object.x = Math.min(Math.max(0, newX), window.innerWidth);
      this.object.y = Math.min(Math.max(0, newY), window.innerHeight);
    }
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

        if (event.target === this.canvasService.context?.canvas) {
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

  private randomizeColor(): void {
    if (this.invincible) {
      const colors = [GameColor.Red, GameColor.Green, GameColor.Blue, GameColor.Yellow];
      const randomIndex = Math.floor(Math.random() * colors.length);
      this.randomColor = colors[randomIndex] as GameColor;
    }
  }

  private pulseSize(maxSize: number): number {
    const steps = 20;
    const stepSize = (maxSize - 1) / (steps / 2);
    const sizeIndex = Math.floor(Date.now() / 20) % steps;

    return sizeIndex < steps / 2 ? 1 + sizeIndex * stepSize : 1 + (steps - 1 - sizeIndex) * stepSize;
  }
}
