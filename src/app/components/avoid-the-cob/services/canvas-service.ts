import { Injectable } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectShape } from '../models/game-object/game-object-shape';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  canvasEle!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  setup() {
    this.canvasEle = document.querySelector('canvas') as HTMLCanvasElement;
    const canvas = this.canvasEle;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    this.context = canvas.getContext('2d')!;
    this.context.scale(devicePixelRatio, devicePixelRatio);
  }

  drawObject(context: CanvasRenderingContext2D, object: GameObject, scale = 1) {
    context.fillStyle = object.color;
    context.beginPath();

    if (object.shape === GameObjectShape.Square) {
      this.drawSquare(context, object, scale);
    } else {
      this.drawCircle(context, object, scale, object.shape !== GameObjectShape.Donut);
    }

    context.closePath();
    context.fill();
  }

  flash(duration: number, color: string, animationClass?: string) {
    const canvasClass = this.canvasEle.classList;
    const canvasStyles = this.canvasEle.style;
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

  private drawSquare(context: CanvasRenderingContext2D, object: GameObject, scale: number) {
    const drawX = object.x - object.size / 2;
    const drawY = object.y - object.size / 2;
    const size = object.size * scale;
    const cornerRadius = size / 3;

    context.beginPath();
    context.moveTo(drawX + cornerRadius, drawY);
    context.lineTo(drawX + size - cornerRadius, drawY);
    context.quadraticCurveTo(drawX + size, drawY, drawX + size, drawY + cornerRadius);
    context.lineTo(drawX + size, drawY + size - cornerRadius);
    context.quadraticCurveTo(drawX + size, drawY + size, drawX + size - cornerRadius, drawY + size);
    context.lineTo(drawX + cornerRadius, drawY + size);
    context.quadraticCurveTo(drawX, drawY + size, drawX, drawY + size - cornerRadius);
    context.lineTo(drawX, drawY + cornerRadius);
    context.quadraticCurveTo(drawX, drawY, drawX + cornerRadius, drawY);
    context.closePath();
    context.fill();
  }

  private drawCircle(context: CanvasRenderingContext2D, object: GameObject, scale: number, filled: boolean) {
    context.arc(object.x, object.y, object.size * scale, 0, 2 * Math.PI);

    if (!filled) {
      context.fillStyle = '#00000000';
      context.strokeStyle = object.color;
      context.lineWidth = 5;
      context.fill();
      context.stroke();
    }
  }
}
