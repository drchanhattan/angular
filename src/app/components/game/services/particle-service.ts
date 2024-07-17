import { Injectable } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectType } from '../models/game-object/game-object-type';
import { CanvasService } from './canvas-service';

@Injectable({
  providedIn: 'root',
})
export class ParticleService {
  particles: GameObject[] = [];

  constructor(private canvasService: CanvasService) {}

  draw(context: CanvasRenderingContext2D): void {
    this.particles.forEach((p) => {
      context.globalAlpha = 0.8;
      this.canvasService.drawObject(context, p, 0.25);
      p.move();
      context.globalAlpha = 1;
    });
  }
  // ==============================

  create(object: GameObject, count = 25): void {
    const currentTime = new Date();
    for (let i = 0; i < count; i++) {
      if (this.particles.length < 1500) {
        const size = object.size * (Math.random() * (1 - 0.6) + 0.6);
        const settings = new GameObjectSettings(GameObjectType.Particle, object.color, size, object.shape, 1);
        const particle = new GameObject(object.x, object.y, settings);
        particle.timestamp = new Date(currentTime.getTime() + i * 50);
        this.particles.push(particle);
      } else {
        return;
      }
    }
  }

  decay(): void {
    const currentTime = new Date().getTime();
    this.particles = this.particles.filter((p) => {
      const isOnScreen = p.x >= 0 && p.x <= window.innerWidth && p.y >= 0 && p.y <= window.innerHeight;
      return isOnScreen && currentTime - p.timestamp.getTime() <= 2000;
    });
  }
}
