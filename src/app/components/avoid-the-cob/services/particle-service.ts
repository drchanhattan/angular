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
  max = new FormControl<number>(2000);

  constructor(private canvasService: CanvasService) {
    const maxP = localStorage.getItem('particles');

    if (maxP) {
      this.max.setValue(JSON.parse(maxP));
    }

    this.max.valueChanges.subscribe((change) => {
      localStorage.setItem('particles', JSON.stringify(change));
    });
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
    const maxCount = this.max.value;
    if (maxCount) {
      const currentTime = new Date();
      for (let i = 0; i < count; i++) {
        if (this.particles.length > maxCount) {
          this.particles.splice(0, count);
        }
        const size = object.size * (Math.random() * (1 - 0.6) + 0.6);
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
      return isOnScreen && currentTime - p.timestamp.getTime() <= 2750;
    });
  }
}
