import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectType } from '../models/game-object/game-object-type';
import { CanvasService } from './canvas-service';

@Injectable({
  providedIn: 'root',
})
export class ParticleService {
  particles: GameObject[] = [];
  default = 2000;
  maxCount = new FormControl<number>(this.default);

  constructor(private canvasService: CanvasService) {
    const maxP = localStorage.getItem('particles');

    if (maxP) {
      this.maxCount.setValue(JSON.parse(maxP));
    }

    this.maxCount.valueChanges.subscribe((change) => {
      localStorage.setItem('particles', JSON.stringify(change));
    });
  }

  get maxCountChanged() {
    return this.maxCount.value !== this.default;
  }

  draw(context: CanvasRenderingContext2D) {
    this.particles.forEach((p) => {
      context.globalAlpha = 0.8;
      this.canvasService.drawObject(context, p, 0.25);
      p.deltaY = p.deltaY + p.gravity;
      p.move();
      context.globalAlpha = 1;
    });

    this.decay();
  }

  create(object: GameObject, count = 25, speed = 1) {
    const maxCount = this.maxCount.value;
    if (maxCount) {
      const currentTime = new Date();
      for (let i = 0; i < count; i++) {
        const size = object.size * 0.6;
        const settings = new GameObjectSettings(
          GameObjectType.Particle,
          object.color,
          size,
          object.shape,
          speed,
          object.gravity || 0.001,
        );
        const particle = new GameObject(object.x, object.y, settings);
        particle.timestamp = new Date(currentTime.getTime() + i * 50);
        this.particles.push(particle);
      }

      if (this.particles.length > maxCount) {
        this.particles.splice(0, this.particles.length - maxCount);
      }
    }
  }

  menuParticles(elementId: string, objSettings: GameObjectSettings, count: number) {
    setTimeout(() => {
      const interval = setInterval(() => {
        const svg = document.getElementById(elementId);
        if (svg) {
          const rect = svg.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const centre = new GameObject(centerX, centerY, objSettings);
          this.create(centre, count, 2);
        } else {
          clearInterval(interval);
        }
      }, 750);
    }, 500);
  }

  private decay() {
    const currentTime = new Date().getTime();

    this.particles = this.particles.filter((p) => {
      const isOnScreen = p.x >= 0 && p.x <= window.innerWidth && p.y >= 0 && p.y <= window.innerHeight;
      const randomChance = Math.random() > 0.99;
      const age = currentTime - p.timestamp.getTime();
      const fresh = age < 1000;
      const expired = age > 3000;

      return isOnScreen && (fresh || !randomChance) && !expired;
    });
  }
}
