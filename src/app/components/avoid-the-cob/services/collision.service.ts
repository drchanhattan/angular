import { inject, Injectable } from '@angular/core';
import { GameAudio } from '../models/game-audio/game-audio';
import { GameColor } from '../models/game-color/game-color';
import { GameObject } from '../models/game-object/game-object';
import { GameStateStore } from '../store/game-state.store';
import { ScoreStore } from '../store/score.store';
import { AudioService } from './audio.service';
import { CanvasService } from './canvas.service';
import { CursorService } from './cursor.service';
import { GameFlowService } from './game-flow.service';
import { ParticleService } from './particle.service';
import { PowerUpService } from './power-up.service';

@Injectable({
  providedIn: 'root',
})
export class CollisionService {
  private readonly audioService = inject(AudioService);
  private readonly canvasService = inject(CanvasService);
  private readonly cursor = inject(CursorService);
  private readonly gameFlow = inject(GameFlowService);
  private readonly gameState = inject(GameStateStore);
  private readonly particleService = inject(ParticleService);
  private readonly powerUpService = inject(PowerUpService);
  private readonly scoreStore = inject(ScoreStore);

  public processCollisions(obj: GameObject) {
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
      this.audioService.playSfx(GameAudio.Pea);
      this.scoreStore.peaCollected();
      this.particleService.create(pea, 20);
      pea.destroy();
    }
  }

  private cornCollision(corn: GameObject) {
    if (corn.detectCollision(this.cursor.object)) {
      this.audioService.playSfx(GameAudio.Corn);
      this.particleService.create(corn);
      corn.destroy();

      if (!this.cursor.invincible) {
        this.gameState.loseLife();
        this.canvasService.flash(500, GameColor.FlashRed, 'animate-jiggle');
        this.cursor.disableCollision(500);
        this.scoreStore.resetCombo();
      }

      if (this.gameState.lives() === 0) {
        this.gameFlow.gameOver();
      }
    }
  }

  private powerUpCollision(powerUp: GameObject) {
    if (powerUp.detectCollision(this.cursor.object)) {
      this.audioService.playSfx(GameAudio.PowerUp);
      this.canvasService.flash(500, GameColor.FlashBlue, 'animate-pulse');
      this.particleService.create(powerUp, 100);
      this.powerUpService.randomPowerUp(this.gameState.level());
      powerUp.destroy();
    }
  }

  private heartCollision(heart: GameObject) {
    if (heart.detectCollision(this.cursor.object)) {
      this.audioService.playSfx(GameAudio.Heart);
      this.cursor.blink(heart.color, 2, 100);
      this.gameState.gainLife();
      this.particleService.create(heart, 8);
      heart.destroy();
    }
  }
}
