import { Injectable } from '@angular/core';
import { GameTextService } from '../components/game-text/game-text-service';
import { MainMenuService } from '../components/main-menu/main-menu-service';
import { ModeSelectorService } from '../components/mode-selector/mode-selector-service';
import { PlayerNameService } from '../components/player-name/player-name-service';
import { AudioFile, AudioService } from './audio-service';
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
    private audioService: AudioService,
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
    this.gameObjectService.processGameObjects(
      this.gameStateService.paused,
      this.collisionService,
      this.gameStateService.mob,
    );
    this.particleService.draw(this.canvasService.context);

    if (!this.gameStateService.paused) {
      this.cursor.draw();

      if (
        (this.gameStateService.mob && !this.gameStateService.timer) ||
        (!this.gameStateService.mob && this.gameObjectService.objectsCleared())
      ) {
        this.audioService.play(AudioFile.LevelUp);
        this.gameStateService.levelCleared();
      }
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

  newGame(mob: boolean) {
    this.gameStateService.mob = mob;
    this.gameStateService.reset();
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
