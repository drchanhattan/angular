import { inject, Injectable } from '@angular/core';
import { GameTextStore } from '../components/game-text/game-text.store';
import { LeaderboardService } from '../components/leaderboard/leaderboard.service';
import { MainMenuService } from '../components/main-menu/main-menu.service';
import { GameAudio } from '../models/game-audio/game-audio';
import { GameColor } from '../models/game-color/game-color';
import { GameStateStore } from '../store/game-state.store';
import { ScoreStore } from '../store/score.store';
import { AudioService } from './audio.service';
import { CanvasService } from './canvas.service';
import { CheatService } from './cheat.service';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { FirebaseService } from './firebase.service';
import { GameObjectService } from './game-object.service';

@Injectable({
  providedIn: 'root',
})
export class GameFlowService {
  private readonly audioService = inject(AudioService);
  private readonly canvasService = inject(CanvasService);
  private readonly cheatService = inject(CheatService);
  private readonly cursor = inject(CursorService);
  private readonly difficultyService = inject(DifficultyService);
  private readonly firebaseService = inject(FirebaseService);
  private readonly gameObjectService = inject(GameObjectService);
  private readonly gameState = inject(GameStateStore);
  private readonly leaderboardService = inject(LeaderboardService);
  private readonly mainMenuService = inject(MainMenuService);
  private readonly scoreStore = inject(ScoreStore);
  private readonly textStore = inject(GameTextStore);

  public start() {
    this.gameState.resume();
    this.cursor.blink(GameColor.Transparent, 4, 125);
    this.cursor.disableCollision(1000);

    if (this.gameState.mobMode()) {
      this.gameState.startTimer(10);
      this.gameObjectService.mobs.createObjects();
    } else {
      this.gameObjectService.peas.createObjects();
      this.gameObjectService.corns.createObjects();
    }

    this.cheatService.execute();
  }

  public gameOver() {
    const { cheatsEnabled } = this.cheatService;
    const browserResized = this.gameState.browserResized();
    const mobMode = this.gameState.mobMode();

    this.gameState.end();
    this.gameState.clearTimer();
    this.audioService.stopMusic();

    if (!cheatsEnabled && !browserResized && !mobMode) {
      this.firebaseService.save(this.scoreStore.score());
    }

    const subtext = browserResized
      ? 'Browser window resize detected'
      : mobMode
        ? `You reached level: ${this.gameState.level()}`
        : `Score: ${this.scoreStore.score()}`;

    this.textStore.show('Game Over', subtext, 5000).then(() => {
      this.scoreStore.resetScore();
      this.gameObjectService.destroyAll();
      this.gameState.resetLevel();
      this.cursor.showPointer();
      cheatsEnabled || browserResized || mobMode ? this.mainMenuService.show() : this.leaderboardService.show();
    });
  }

  // In mob mode the level ends when the timer runs out (timer becomes null)
  public checkLevelComplete() {
    const levelComplete = this.gameState.mobMode()
      ? this.gameState.timer() === null
      : this.gameObjectService.objectsCleared();

    if (!this.gameState.paused() && levelComplete) {
      this.cursor.collisionEnabled = false;
      this.cursor.setInvincibility(false);
      this.gameState.browserResized() ? this.gameOver() : this.levelUp();
    }
  }

  private levelUp() {
    this.gameState.pause();
    this.gameState.clearTimer();
    this.audioService.setMusicSpeed(1);
    this.audioService.playSfx(GameAudio.LevelUp);
    this.canvasService.flash(200, GameColor.Cream);
    this.scoreStore.levelIncrease();

    this.textStore.show(`Level ${this.gameState.level() + 1}`, '', 3500).then(() => {
      this.gameState.nextLevel();
      this.difficultyService.increase(
        this.gameState.level(),
        this.gameState.mobMode(),
        this.cheatService.cheatsEnabled,
      );
      this.start();
    });
  }
}
