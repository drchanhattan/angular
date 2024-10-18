import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { GameTextService } from '../components/game-text/game-text.service';
import { LeaderboardService } from '../components/leaderboard/leaderboard.service';
import { MainMenuService } from '../components/main-menu/main-menu.service';
import { GameColor } from '../models/game-color/game-color';
import { AudioFile, AudioService } from './audio.service';
import { CanvasService } from './canvas.service';
import { CheatService } from './cheat.service';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { FirebaseService } from './firebase.service';
import { GameObjectService } from './game-object.service';
import { ScoreService } from './score.service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  browserResized = false;
  lives$ = new BehaviorSubject<number>(0);
  paused = true;
  timer = '';
  timerInterval: any;
  mobMode = false;

  constructor(
    private audioService: AudioService,
    private canvasService: CanvasService,
    private cheatService: CheatService,
    private cursor: CursorService,
    private difficultyService: DifficultyService,
    private firebaseService: FirebaseService,
    private gameObjectService: GameObjectService,
    private leaderboardService: LeaderboardService,
    private mainMenuService: MainMenuService,
    private scoreService: ScoreService,
    private textService: GameTextService,
    private toolbarService: ToolbarService,
  ) {
    this.lives$.subscribe((lives) => this.toolbarService.hideMenuBtn$.next(!!lives));
  }

  start() {
    this.paused = false;
    this.cursor.blink(GameColor.Transparent, 4, 125);
    this.cursor.disableCollision(1000);

    if (this.mobMode) {
      this.lifeTimer();
      this.gameObjectService.mobs.createObjects();
    } else {
      this.gameObjectService.peas.createObjects();
      this.gameObjectService.corns.createObjects();
    }

    this.cheatService.execute();
  }

  gameOver() {
    const { cheatsEnabled } = this.cheatService;

    this.lives$.next(0);
    this.paused = true;
    this.clearTimer();
    this.audioService.stopMusic();

    if (!cheatsEnabled && !this.browserResized && !this.mobMode) {
      this.firebaseService.save(this.scoreService.score);
    }

    const subtext = this.browserResized
      ? 'Browser window resize detected'
      : this.mobMode
        ? `You reached level: ${this.difficultyService.level}`
        : `Score: ${this.scoreService.score}`;
    this.textService.show('Game Over', subtext, 5000).then(() => {
      this.scoreService.resetScore();
      this.gameObjectService.destroyAll();
      this.difficultyService.level = 0;
      this.cursor.showPointer();
      cheatsEnabled || this.browserResized || this.mobMode
        ? this.mainMenuService.show()
        : this.leaderboardService.show();
    });
  }

  reset(mobMode: boolean) {
    this.mobMode = mobMode;
    this.lives$.next(mobMode ? 10 : 3);
    this.browserResized = false;
  }

  checkLevelComplete(mobMode: boolean) {
    if (!this.paused && ((mobMode && !this.timer) || (!mobMode && this.gameObjectService.objectsCleared()))) {
      this.cursor.collisionEnabled = false;
      this.cursor.setInvincibility(false);
      this.browserResized ? this.gameOver() : this.levelUp();
    }
  }

  levelUp() {
    this.paused = true;
    this.clearTimer();
    this.audioService.setMusicSpeed(1);
    this.audioService.playSfx(AudioFile.LevelUp);
    this.canvasService.flash(200, GameColor.Cream);
    this.scoreService.levelIncrease();
    this.levelUpText().then(() => {
      this.difficultyService.increase(this.mobMode, this.cheatService.cheatsEnabled);
      this.start();
    });
  }

  private levelUpText() {
    const nextLevel = this.difficultyService.level + 1;
    return this.textService.show(`Level ${nextLevel}`, '', 3500);
  }

  private lifeTimer() {
    let timeLeft = 10;
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
