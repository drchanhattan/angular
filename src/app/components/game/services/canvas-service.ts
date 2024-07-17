import { ElementRef, Injectable } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectShape } from '../models/game-object/game-object-shape';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  canvasEle!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;

  // Setup
  // ==============================

  setup(canvasEle: ElementRef<HTMLCanvasElement>) {
    this.canvasEle = canvasEle;
    const canvas = this.canvasEle.nativeElement;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    this.context = canvas.getContext('2d')!;
    this.context.scale(devicePixelRatio, devicePixelRatio);
  }

  // Drawing Objects
  // ==============================

  drawObject(context: CanvasRenderingContext2D, object: GameObject, sizeMultiplier = 1): void {
    context.fillStyle = object.color;
    context.beginPath();

    if (object.shape === GameObjectShape.Square) {
      this.drawSquare(context, object, sizeMultiplier);
    } else if (object.shape === GameObjectShape.Circle) {
      this.drawCircle(context, object, sizeMultiplier);
    }

    context.closePath();
    context.fill();
  }

  // Flashing Effects
  // ==============================

  flash(duration: number, color: string, animationClass?: string) {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const canvasClass = this.canvasEle.nativeElement.classList;
    const canvasStyles = this.canvasEle.nativeElement.style;
    canvasStyles.backgroundColor = color;

    if (!isTouchDevice && animationClass) {
      canvasClass.toggle(animationClass);
    }

    setTimeout(() => {
      canvasStyles.backgroundColor = '';
      if (!isTouchDevice && animationClass) {
        canvasClass.toggle(animationClass);
      }
    }, duration);
  }

  // Draw shape
  // ==============================

  private drawSquare(context: CanvasRenderingContext2D, object: GameObject, sizeMultiplier: number) {
    const drawX = object.x - object.size / 2;
    const drawY = object.y - object.size / 2;
    const size = object.size * sizeMultiplier;
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

  private drawCircle(context: CanvasRenderingContext2D, object: GameObject, sizeMultiplier: number) {
    context.arc(object.x, object.y, object.size * sizeMultiplier, 0, 2 * Math.PI);
  }
}
