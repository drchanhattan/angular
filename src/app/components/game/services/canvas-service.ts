import { ElementRef } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectShape } from '../models/game-object/game-object-shape';

export class CanvasService {
  canvasEle!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;
  particles: GameObject[] = [];

  setup(canvasEle: ElementRef<HTMLCanvasElement>) {
    this.canvasEle = canvasEle;
    const canvas = this.canvasEle.nativeElement;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    this.context = canvas.getContext('2d')!;
    this.context.scale(devicePixelRatio, devicePixelRatio);
  }

  drawObject(context: CanvasRenderingContext2D, object: GameObject, sizeMultiplier = 1): void {
    context.fillStyle = object.color;
    context.beginPath();

    object.shape === GameObjectShape.Rect
      ? this.#drawSquare(context, object, sizeMultiplier)
      : this.#drawCircle(context, object, sizeMultiplier);

    context.closePath();
    context.fill();
  }

  drawParticles(context: CanvasRenderingContext2D): void {
    this.particles.forEach((p) => {
      context.globalAlpha = 0.8;
      this.drawObject(context, p, 0.25);
      p.move();
      context.globalAlpha = 1;
    });
  }

  particleDecay(): void {
    const currentTime = new Date().getTime();
    this.particles = this.particles.filter((p) => {
      return currentTime - p.timestamp.getTime() <= 2000;
    });
  }

  createParticles(object: GameObject): void {
    const count = 25;
    const speed = 1;
    const currentTime = new Date();
    for (let i = 0; i < count; i++) {
      const settings = new GameObjectSettings(object.color, object.size, object.shape, speed);
      const particle = new GameObject(object.x, object.y, settings);
      particle.timestamp = new Date(currentTime.getTime() + i * 50);
      this.particles.push(particle);
    }
  }

  flash(color: string, duration: number) {
    const canvasClass = this.canvasEle.nativeElement.classList;
    canvasClass.toggle(color);
    canvasClass.toggle('animate-jiggle');

    setTimeout(() => {
      canvasClass.toggle(color);
      canvasClass.toggle('animate-jiggle');
    }, duration);
  }

  #drawSquare(context: CanvasRenderingContext2D, object: GameObject, sizeMultiplier: number) {
    const drawX = object.x - object.size / 2;
    const drawY = object.y - object.size / 2;
    context.fillRect(drawX, drawY, object.size * sizeMultiplier, object.size * sizeMultiplier);
  }

  #drawCircle(context: CanvasRenderingContext2D, object: GameObject, sizeMultiplier: number) {
    context.arc(object.x, object.y, object.size * sizeMultiplier, 0, 2 * Math.PI);
  }
}
