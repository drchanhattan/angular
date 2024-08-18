import { Injectable } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { AudioFile, AudioService } from './audio-service';
import { CanvasService } from './canvas-service';
import { CursorService } from './cursor.service';
import { GameStateService } from './game-state-service';
import { ParticleService } from './particle-service';
import { PowerUpService } from './power-up-service';
import { ScoreService } from './score-service';

@Injectable({
  providedIn: 'root',
})
export class CollisionService {
  constructor(
    private audioService: AudioService,
    private canvasService: CanvasService,
    private cursor: CursorService,
    private gameStateService: GameStateService,
    private particleService: ParticleService,
    private powerUpService: PowerUpService,
    private scoreService: ScoreService,
  ) {}

  processCollisions(obj: GameObject) {
    obj.processWallCollision();
    this.processCursorCollisions(obj);
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
      this.audioService.play(AudioFile.Pea);
      this.scoreService.peaCollected();
      this.particleService.create(pea, 20);
      pea.destroy();
    }
  }

  private cornCollision(corn: GameObject) {
    if (corn.detectCollision(this.cursor.object)) {
      this.audioService.play(AudioFile.Corn);
      this.particleService.create(corn);
      corn.destroy();

      if (!this.cursor.invincible) {
        this.gameStateService.lives--;
        this.canvasService.flash(500, '#7F1D1D', 'animate-jiggle');
        this.cursor.disableCollision(500);
        this.scoreService.resetCombo();
      }

      if (this.gameStateService.lives === 0) {
        this.gameStateService.gameOver();
      }
    }
  }

  private powerUpCollision(powerUp: GameObject) {
    if (powerUp.detectCollision(this.cursor.object)) {
      this.audioService.play(AudioFile.PowerUp);
      this.canvasService.flash(500, '#1A40AF', 'animate-pulse');
      this.particleService.create(powerUp, 100);
      this.powerUpService.randomPowerUp();
      powerUp.destroy();
    }
  }

  private heartCollision(heart: GameObject) {
    if (heart.detectCollision(this.cursor.object)) {
      this.audioService.play(AudioFile.Heart);
      this.cursor.blink(heart.color, 2, 100);
      this.gameStateService.lives++;
      this.particleService.create(heart, 8);
      heart.destroy();
    }
  }
}
