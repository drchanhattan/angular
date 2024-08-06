import { Injectable } from '@angular/core';
import { GameTextService } from '../components/game-text/game-text-service';
import { LeaderboardService } from '../components/leaderboard/leaderboard-service';
import { MainMenuService } from '../components/main-menu/main-menu-service';
import { scaledSize } from '../models/device-scale/device-scale';
import { GameColors } from '../models/game-colors/game-colors';
import { AudioFile, AudioService } from './audio-service';
import { CheatService } from './cheat-service';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { FirebaseService } from './firebase.service';
import { GameObjectService } from './game-object-service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  browserResized = false;
  lives = 0;
  paused = true;
  timer = '';
  timerInterval: any;
  mobMode = false;

  constructor(
    private audioService: AudioService,
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
    this.cursor.blink(GameColors.Gray, 4, 125);
    this.cursor.disableCollision(1000);

    if (this.mobMode) {
      this.lifeTimer();
      this.cursor.object.size = scaledSize(8);
      this.gameObjectService.mobs.createObjects();
    } else {
      this.gameObjectService.peas.createObjects();
      this.gameObjectService.corns.createObjects();
    }

    this.cheatService.execute();
  }

  gameOver() {
    const { cheatsEnabled } = this.cheatService;

    this.clearTimer();
    this.lives = 0;
    this.paused = true;

    if (!cheatsEnabled && !this.browserResized) {
      this.firebaseService.save(this.difficultyService.level);
    }

    const subtext = this.browserResized
      ? 'Browser window resize detected'
      : `You reached level ${this.difficultyService.level}`;
    this.textService.show('Game Over', subtext, 5000);

    setTimeout(() => {
      this.gameObjectService.destroyAll();
      this.cursor.show();
      cheatsEnabled || this.browserResized ? this.mainMenuService.show() : this.leaderboardService.show();
    }, 6000);
  }

  reset(mobMode: boolean) {
    this.mobMode = mobMode;
    this.lives = mobMode ? 10 : 3;
    this.browserResized = false;
  }

  checkLevelComplete(mobMode: boolean) {
    if ((mobMode && !this.timer) || (!mobMode && this.gameObjectService.objectsCleared())) {
      this.cursor.collisionEnabled = false;
      this.cursor.setInvincibility(false);
      this.browserResized ? this.gameOver() : this.levelUp();
    }
  }

  levelUp() {
    this.paused = true;
    this.clearTimer();
    this.levelUpText();
    this.audioService.play(AudioFile.LevelUp);

    setTimeout(() => {
      this.difficultyService.increase(this.mobMode, this.cheatService.cheatsEnabled);
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

  private lifeTimer() {
    let timeLeft = 15;
    this.timer = timeLeft.toString();

    this.timerInterval = setInterval(() => {
      timeLeft -= 1;
      this.timer = timeLeft.toString();

      if (timeLeft <= 0) {
        this.clearTimer();
        this.levelUp;
      }
    }, 1000);
  }

  private clearTimer() {
    this.timer = '';
    clearInterval(this.timerInterval);
  }
}
