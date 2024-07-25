import { Injectable } from '@angular/core';
import { GameTextService } from './components/game-text/game-text-service';
import { MainMenuService } from './components/main-menu/main-menu-service';
import { PlayerNameService } from './components/player-name/player-name-service';
import { CanvasService } from './services/canvas-service';
import { CollisionService } from './services/collision-service';
import { CursorService } from './services/cursor.service';
import { DifficultyService } from './services/difficulty.service';
import { GameObjectService } from './services/game-object-service';
import { GameStateService } from './services/game-state-service';
import { ParticleService } from './services/particle-service';

@Injectable({
  providedIn: 'root',
})
export class AvoidTheCobService {
  constructor(
    private canvasService: CanvasService,
    private collisionService: CollisionService,
    private cursor: CursorService,
    private difficultyService: DifficultyService,
    private gameStateService: GameStateService,
    private mainMenuService: MainMenuService,
    private gameObjectService: GameObjectService,
    private particleService: ParticleService,
    private playerNameService: PlayerNameService,
    private textService: GameTextService,
  ) {}

  play() {
    const name = window.localStorage.getItem('name');

    if (!!name) {
      this.mainMenuService.hide();
      this.playerNameService.hide();
      this.newGame();
    } else {
      this.mainMenuService.hide();
      this.playerNameService.show();
    }
  }

  draw() {
    this.gameObjectService.processGameObjects(this.gameStateService.paused, this.collisionService);
    this.particleService.draw(this.canvasService.context);

    if (!this.gameStateService.paused) {
      this.cursor.draw();

      if (this.gameObjectService.objectsCleared()) {
        this.gameStateService.levelCleared();
      }
    }
  }

  private newGame() {
    this.gameStateService.resetLives();
    this.gameObjectService.reset();
    this.difficultyService.resetLevel();
    this.cursor.reset();
    this.cursor.hide();
    this.textService.show(`Level ${this.difficultyService.level}`, '', 2500);

    setTimeout(() => {
      this.gameStateService.start();
    }, 3000);
  }
}
