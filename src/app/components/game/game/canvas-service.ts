import { ElementRef } from '@angular/core';
import { GameObject, GameObjectShape } from './game-object';

export class CanvasService {
  context!: CanvasRenderingContext2D;
  canvasEle!: ElementRef<HTMLCanvasElement>;
  screenW = window.innerWidth;
  screenH = window.innerHeight;
  particles: GameObject[] = [];

  init(canvasEle: ElementRef<HTMLCanvasElement>) {
    this.canvasEle = canvasEle;
    const canvas = this.canvasEle.nativeElement;
    canvas.width = this.screenW * devicePixelRatio;
    canvas.height = this.screenH * devicePixelRatio;
    this.context = canvas.getContext('2d')!;
    this.context.scale(devicePixelRatio, devicePixelRatio);
  }

  drawObject(context: CanvasRenderingContext2D, object: GameObject, sizeMultiplier = 1): void {
    context.fillStyle = object.colour;
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

  wallCollision(object: GameObject): void {
    if (object.detectWallCollisionX(this.screenW)) {
      const centreX = this.screenW / 2;
      const sign = Math.sign(object.deltaX);
      if ((object.x < centreX && sign === -1) || (object.x > centreX && sign === 1)) {
        object.reverseDirection(true);
      }
    }

    if (object.detectWallCollisionY(this.screenH)) {
      const centreY = this.screenH / 2;
      const sign = Math.sign(object.deltaY);
      if ((object.y < centreY && sign === -1) || (object.y > centreY && sign === 1)) {
        object.reverseDirection(false);
      }
    }
  }

  createParticles(object: GameObject): void {
    const count = 25;
    const speed = 1;
    const currentTime = new Date();
    for (let i = 0; i < count; i++) {
      const p = new GameObject();
      p.x = object.x;
      p.y = object.y;
      p.setRandomDelta(true, true, speed);
      p.size = object.size;
      p.shape = object.shape;
      p.colour = object.colour;
      p.timestamp = new Date(currentTime.getTime() + i * 50);

      this.particles.push(p);
    }
  }

  flash(color: string, duration: number) {
    const canvasClass = this.canvasEle.nativeElement.classList;
    canvasClass.toggle(color);

    setTimeout(() => {
      canvasClass.toggle(color);
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
