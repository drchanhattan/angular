import { Injectable } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectShape } from '../models/game-object/game-object-shape';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  context!: CanvasRenderingContext2D;

  init() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    this.context = canvas.getContext('2d')!;
    this.context.scale(devicePixelRatio, devicePixelRatio);
  }

  drawObject(object: GameObject, scale = 1, transparency = 1) {
    this.context.globalAlpha = transparency;
    this.context.fillStyle = object.color;
    this.context.beginPath();

    object.shape === GameObjectShape.Square
      ? this.drawSquare(object, scale)
      : this.drawCircle(object, scale, object.shape !== GameObjectShape.Donut);

    this.context.closePath();
    this.context.fill();
    this.context.globalAlpha = 1;
  }

  flash(duration: number, color: string, animationClass?: string) {
    const canvasClass = this.context.canvas.classList;
    const canvasStyles = this.context.canvas.style;
    canvasStyles.backgroundColor = color;

    if (animationClass) {
      canvasClass.add(animationClass);
    }

    setTimeout(() => {
      canvasStyles.backgroundColor = '';
      if (animationClass) {
        canvasClass.remove(animationClass);
      }
    }, duration);
  }

  private drawSquare(object: GameObject, scale: number) {
    const drawX = object.x - object.size / 2;
    const drawY = object.y - object.size / 2;
    const size = object.size * scale;
    const cornerRadius = size / 3;

    this.context.beginPath();
    this.context.moveTo(drawX + cornerRadius, drawY);
    this.context.lineTo(drawX + size - cornerRadius, drawY);
    this.context.quadraticCurveTo(drawX + size, drawY, drawX + size, drawY + cornerRadius);
    this.context.lineTo(drawX + size, drawY + size - cornerRadius);
    this.context.quadraticCurveTo(drawX + size, drawY + size, drawX + size - cornerRadius, drawY + size);
    this.context.lineTo(drawX + cornerRadius, drawY + size);
    this.context.quadraticCurveTo(drawX, drawY + size, drawX, drawY + size - cornerRadius);
    this.context.lineTo(drawX, drawY + cornerRadius);
    this.context.quadraticCurveTo(drawX, drawY, drawX + cornerRadius, drawY);
    this.context.closePath();
    this.context.fill();
  }

  private drawCircle(object: GameObject, scale: number, filled: boolean) {
    this.context.arc(object.x, object.y, object.size * scale, 0, 2 * Math.PI);

    if (!filled) {
      this.context.fillStyle = '#00000000';
      this.context.strokeStyle = object.color;
      this.context.lineWidth = 5;
      this.context.fill();
      this.context.stroke();
    }
  }
}
