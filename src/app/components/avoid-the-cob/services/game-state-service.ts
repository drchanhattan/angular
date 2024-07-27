import { Injectable } from '@angular/core';
import { GameTextService } from '../components/game-text/game-text-service';
import { LeaderboardService } from '../components/leaderboard/leaderboard-service';
import { GameColors } from '../models/game-colors/game-colors';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { FirebaseService } from './firebase.service';
import { GameObjectService } from './game-object-service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  lives = 0;
  paused = true;

  constructor(
    private cursor: CursorService,
    private difficultyService: DifficultyService,
    private firebaseService: FirebaseService,
    private gameObjectService: GameObjectService,
    private leaderboardService: LeaderboardService,
    private textService: GameTextService,
  ) {}

  start() {
    this.gameObjectService.peas.createObjects();
    this.gameObjectService.corn.createObjects();
    this.paused = false;
    this.cursor.blink(GameColors.Gray, 4, 125);
    this.cursor.disableCollision(1000);
  }

  gameOver() {
    this.paused = true;
    this.firebaseService.save(this.difficultyService.level);
    this.textService.show('Game Over', `You reached level ${this.difficultyService.level}`, 5000);

    setTimeout(() => {
      this.leaderboardService.show();
      this.cursor.show();
    }, 6000);
  }

  resetLives() {
    this.lives = 300;
  }

  levelCleared() {
    this.cursor.collisionEnabled = false;
    this.cursor.setInvincibility(false);
    this.paused = true;
    this.levelUpText();

    setTimeout(() => {
      this.difficultyService.increase();
      this.start();
    }, 4000);
  }

  private levelUpText() {
    const nextLevel = this.difficultyService.level + 1;
    const hearts = this.gameObjectService.hearts.objects;
    const collectedHearts = hearts.filter((heart) => heart.isDestroyed).length;
    const subtext = collectedHearts ? `+ ${collectedHearts}` : '';
    this.textService.show(`Level ${nextLevel}`, subtext, 3500);
  }
}
