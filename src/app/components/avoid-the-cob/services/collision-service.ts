import { Injectable } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { CanvasService } from './canvas-service';
import { CursorService } from './cursor.service';
import { GameStateService } from './game-state-service';
import { ParticleService } from './particle-service';
import { PowerUpService } from './power-up-service';

@Injectable({
  providedIn: 'root',
})
export class CollisionService {
  constructor(
    private canvasService: CanvasService,
    private cursor: CursorService,
    private gameStateService: GameStateService,
    private particleService: ParticleService,
    private powerUpService: PowerUpService,
  ) {}

  processCollisions(obj: GameObject) {
    this.processWallCollision(obj);
    this.processCursorCollisions(obj);
  }

  // Wall Collision
  // ==============================

  private processWallCollision(obj: GameObject) {
    if (obj.detectWallCollisionOnAxis('x', window.innerWidth)) {
      this.processWallCollisionOnAxis(obj, 'x', window.innerWidth / 2);
    }

    if (obj.detectWallCollisionOnAxis('y', window.innerHeight)) {
      this.processWallCollisionOnAxis(obj, 'y', window.innerHeight / 2);
    }
  }

  private processWallCollisionOnAxis(obj: GameObject, axis: 'x' | 'y', centre: number) {
    const sign = Math.sign(obj[`delta${axis.toUpperCase()}` as 'deltaX' | 'deltaY']);
    const position = obj[axis];
    if ((position < centre && sign === -1) || (position > centre && sign === 1)) {
      this.reverseDirection(obj, axis);
    }
  }

  private reverseDirection(obj: GameObject, axis: 'x' | 'y') {
    obj[`delta${axis.toUpperCase()}` as 'deltaX' | 'deltaY'] *= -1;
  }

  // Cursor Collision
  // ==============================

  private processCursorCollisions(obj: GameObject) {
    if (this.cursor.collisionEnabled) {
      if (obj.isPea) {
        this.peaCollision(obj);
      } else if (obj.isCorn) {
        this.cornCollision(obj);
      } else if (obj.isPowerUp) {
        this.powerUpCollision(obj);
      } else if (obj.isHeart) {
        this.heartCollision(obj);
      }
    }
  }

  private peaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursor.object)) {
      pea.destroy();
      this.particleService.create(pea, 20);
    }
  }

  private cornCollision(corn: GameObject) {
    if (corn.detectCollision(this.cursor.object)) {
      corn.destroy();
      this.particleService.create(corn);

      if (!this.cursor.invincible) {
        this.gameStateService.lives--;
        this.canvasService.flash(500, '#7F1D1D', 'animate-jiggle');
        this.cursor.disableCollision(500);
      }

      if (this.gameStateService.lives === 0) {
        this.gameStateService.gameOver();
      }
    }
  }

  private powerUpCollision(powerUp: GameObject) {
    if (powerUp.detectCollision(this.cursor.object)) {
      powerUp.destroy();
      this.particleService.create(powerUp, 100);
      this.canvasService.flash(500, '#1A40AF', 'animate-pulse');
      this.powerUpService.randomPowerUp();
    }
  }

  private heartCollision(heart: GameObject) {
    if (heart.detectCollision(this.cursor.object)) {
      heart.destroy();
      this.gameStateService.lives++;
      this.particleService.create(heart, 8);
      this.cursor.blink(heart.color, 2, 100);
    }
  }
}
