import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { scaledSize } from '../models/device-scale/device-scale';
import { GameColor } from '../models/game-color/game-color';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectShape } from '../models/game-object/game-object-shape';
import { CanvasService } from './canvas-service';
import { DeviceService } from './device-service';
import { ParticleService } from './particle-service';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  collisionEnabled: boolean = true;
  donut = new FormControl(false);
  invincible: boolean = false;
  object = new GameObject(window.innerWidth / 2, window.innerHeight / 4, GameObjectDefaults.cursor());

  #lastTouch: { x: number; y: number } | null = null;
  #randomColor!: GameColor;

  constructor(
    private canvasService: CanvasService,
    private deviceService: DeviceService,
    private particleService: ParticleService,
  ) {
    this.deviceService.isTouch ? this.handleTouch() : this.handleMouse();
    this.setShape();
    this.randomizeColor();
  }

  draw() {
    if (this.invincible) {
      this.halo(this.#randomColor, 1.25, false);
    }

    this.canvasService.drawObject(this.object);
  }

  cursorSize(mobMode: boolean) {
    return mobMode ? scaledSize(8) : scaledSize(20);
  }

  showPointer() {
    this.canvasService.context.canvas.classList.remove('cursor-none');
  }

  hidePointer() {
    this.canvasService.context.canvas.classList.add('cursor-none');
  }

  reset(mobMode: boolean) {
    this.object.size = this.cursorSize(mobMode);
    this.hidePointer();
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

  halo(color: GameColor, scale = 1.5, blink = true) {
    const blinkActive = blink && Math.floor(Date.now() / 50) % 2 === 0;
    const size = this.object.size * (blinkActive ? 0 : scale);
    const settings = new GameObjectSettings(this.object.type, color, size, GameObjectShape.Circle, 0, 0);

    this.canvasService.drawObject(new GameObject(this.object.x, this.object.y, settings));
  }

  pulse(color: GameColor, scale: number) {
    const settings = new GameObjectSettings(
      this.object.type,
      color,
      this.object.size * this.pulseSize(scale),
      GameObjectShape.Donut,
      0,
      0,
    );

    this.canvasService.drawObject(new GameObject(this.object.x, this.object.y, settings));
  }

  particles(color: GameColor, speed: number, spawnChance: number) {
    if (Math.random() < spawnChance) {
      const cursor = Object.assign({}, this.object);
      cursor.color = color;
      cursor.shape = GameObjectShape.Circle;
      this.particleService.create(cursor, 1, speed);
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

        if (this.#lastTouch) {
          const deltaX = touchX - this.#lastTouch.x;
          const deltaY = touchY - this.#lastTouch.y;

          this.object.x = Math.min(Math.max(0, this.object.x + deltaX), window.innerWidth);
          this.object.y = Math.min(Math.max(0, this.object.y + deltaY), window.innerHeight);
        }

        this.#lastTouch = { x: touchX, y: touchY };

        if (event.target === this.canvasService.context?.canvas) {
          event.preventDefault();
        }
      }
    };

    const touchEndHandler = () => {
      this.#lastTouch = null;
    };

    document.addEventListener('touchmove', touchHandler, { passive: false });
    document.addEventListener('touchstart', touchHandler, { passive: false });
    document.addEventListener('touchend', touchEndHandler);
    document.addEventListener('touchcancel', touchEndHandler);
  }

  private setShape() {
    const donut = localStorage.getItem('donut');

    if (donut) {
      this.object.shape = JSON.parse(donut) ? GameObjectShape.Donut : GameObjectShape.Circle;
      this.donut.setValue(JSON.parse(donut));
    }

    this.donut.valueChanges.pipe().subscribe((change) => {
      this.object.shape = change ? GameObjectShape.Donut : GameObjectShape.Circle;
      localStorage.setItem('donut', JSON.stringify(change));
    });
  }

  private randomizeColor() {
    setInterval(() => {
      if (this.invincible) {
        const colors = [GameColor.Red, GameColor.Green, GameColor.Blue, GameColor.Yellow];
        const randomIndex = Math.floor(Math.random() * colors.length);
        this.#randomColor = colors[randomIndex] as GameColor;
      }
    }, 20);
  }

  private pulseSize(maxSize: number): number {
    const steps = 60;
    const stepSize = (maxSize - 1) / (steps / 2);
    const sizeIndex = Math.floor(Date.now() / 5) % steps;

    return sizeIndex < steps / 2 ? 1 + sizeIndex * stepSize : 1 + (steps - 1 - sizeIndex) * stepSize;
  }
}
