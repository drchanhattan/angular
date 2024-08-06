import { Injectable } from '@angular/core';
import { GameTextService } from '../components/game-text/game-text-service';
import { MainMenuService } from '../components/main-menu/main-menu-service';
import { ModeSelectorService } from '../components/mode-selector/mode-selector-service';
import { PlayerNameService } from '../components/player-name/player-name-service';
import { CanvasService } from './canvas-service';
import { CollisionService } from './collision-service';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { GameObjectService } from './game-object-service';
import { GameStateService } from './game-state-service';
import { ParticleService } from './particle-service';

@Injectable({
  providedIn: 'root',
})
export class AvoidTheCobService {
  constructor(
    private canvasService: CanvasService,
    private collisionService: CollisionService,
    private cursor: CursorService,
    private difficultyService: DifficultyService,
    private gameObjectService: GameObjectService,
    private gameStateService: GameStateService,
    private mainMenuService: MainMenuService,
    private modeSelectorService: ModeSelectorService,
    private nameService: PlayerNameService,
    private particleService: ParticleService,
    private textService: GameTextService,
  ) {}

  draw() {
    const { mobMode, paused } = this.gameStateService;

    this.gameObjectService.processGameObjects(paused, this.collisionService, mobMode);
    this.particleService.draw(this.canvasService.context);

    if (!paused) {
      this.cursor.draw();
      this.gameStateService.checkLevelComplete(mobMode);
    }
  }

  play() {
    const name = localStorage.getItem('name');

    if (!!name) {
      this.selectMode();
    } else {
      this.mainMenuService.hide();
      this.nameService.show();
    }
  }

  selectMode() {
    this.mainMenuService.hide();
    this.modeSelectorService.show();
    this.nameService.hide();
  }

  newGame(mobMode: boolean) {
    this.gameStateService.reset(mobMode);
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
