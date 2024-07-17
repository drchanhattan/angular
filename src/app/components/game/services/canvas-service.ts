import { ElementRef, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ThemeSelectorService } from '../../theme-selector/theme-selector-service';
import { GameColors } from '../models/game-colors/game-colors';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectShape } from '../models/game-object/game-object-shape';
import { GameObjectType } from '../models/game-object/game-object-type';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  canvasEle!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;
  particles: GameObject[] = [];

  backgroundColor$ = this.themeService.currentTheme$.pipe(
    map((theme) => (theme === 'dark-theme' ? GameColors.Black : GameColors.Gray)),
  );
  textColor$ = this.themeService.currentTheme$.pipe(
    map((theme) => (theme === 'dark-theme' ? `text-[${GameColors.White}]` : `text-[${GameColors.Black}]`)),
  );

  // Setup
  // ==============================
  constructor(private themeService: ThemeSelectorService) {}

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

  drawParticles(context: CanvasRenderingContext2D): void {
    this.particles.forEach((p) => {
      context.globalAlpha = 0.8;
      this.drawObject(context, p, 0.25);
      p.move();
      context.globalAlpha = 1;
    });
  }

  // Particle Management
  // ==============================

  createParticles(object: GameObject, count = 25): void {
    const currentTime = new Date();
    for (let i = 0; i < count; i++) {
      const size = object.size * (Math.random() * (1 - 0.6) + 0.6);
      const settings = new GameObjectSettings(GameObjectType.Particle, object.color, size, object.shape, 1);
      const particle = new GameObject(object.x, object.y, settings);
      particle.timestamp = new Date(currentTime.getTime() + i * 50);
      this.particles.push(particle);
    }
  }

  particleDecay(): void {
    const currentTime = new Date().getTime();
    this.particles = this.particles.filter((p) => {
      const isOnScreen =
        p.x >= 0 && p.x <= this.canvasEle.nativeElement.width && p.y >= 0 && p.y <= this.canvasEle.nativeElement.height;
      return isOnScreen && currentTime - p.timestamp.getTime() <= 2000;
    });
  }

  // Flashing Effects
  // ==============================

  flash(duration: number, color: string, animationClass?: string) {
    const canvasClass = this.canvasEle.nativeElement.classList;
    const canvasStyles = this.canvasEle.nativeElement.style;
    canvasStyles.backgroundColor = color;

    if (animationClass) canvasClass.toggle(animationClass);

    setTimeout(() => {
      canvasStyles.backgroundColor = this.themeService.isDark ? GameColors.Black : GameColors.White;
      if (animationClass) canvasClass.toggle(animationClass);
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
