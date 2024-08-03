import { Injectable } from '@angular/core';
import { GameTextService } from '../components/game-text/game-text-service';
import { LeaderboardService } from '../components/leaderboard/leaderboard-service';
import { MainMenuService } from '../components/main-menu/main-menu-service';
import { GameColors } from '../models/game-colors/game-colors';
import { CheatService } from './cheat-service';
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
  browserResized = false;

  constructor(
    private cheatService: CheatService,
    private cursor: CursorService,
    private difficultyService: DifficultyService,
    private firebaseService: FirebaseService,
    private gameObjectService: GameObjectService,
    private leaderboardService: LeaderboardService,
    private mainMenuService: MainMenuService,
    private textService: GameTextService,
  ) {}

  start() {
    this.paused = false;
    this.gameObjectService.peas.createObjects();
    this.gameObjectService.corn.createObjects();
    this.cursor.blink(GameColors.Gray, 4, 125);
    this.cursor.disableCollision(1000);
    this.cheatService.execute();
  }

  async gameOver() {
    const cheated = this.cheatService.cheatsEnabled;
    this.lives = 0;
    this.paused = true;

    if (!cheated) {
      this.firebaseService.save(this.difficultyService.level);
    }

    const subtext = this.browserResized
      ? 'Browser window resize detected'
      : `You reached level ${this.difficultyService.level}`;
    this.textService.show('Game Over', subtext, 5000);

    setTimeout(() => {
      this.gameObjectService.destroyAll();
      this.cursor.show();
      cheated ? this.mainMenuService.show() : this.leaderboardService.show();
    }, 6000);
  }

  reset() {
    this.lives = 3;
    this.browserResized = false;
  }

  levelCleared() {
    this.cursor.collisionEnabled = false;
    this.cursor.setInvincibility(false);
    this.browserResized ? this.gameOver() : this.levelUp();
  }

  levelUp() {
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
