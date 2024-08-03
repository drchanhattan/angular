import { Injectable } from '@angular/core';
import { GameTextService } from '../components/game-text/game-text-service';
import { MainMenuService } from '../components/main-menu/main-menu-service';
import { NewPlayerService } from '../components/new-player/new-player-service';
import { AudioService } from './audio-service';
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
    private newPlayerService: NewPlayerService,
    private particleService: ParticleService,
    private textService: GameTextService,
  ) {}

  draw() {
    this.gameObjectService.processGameObjects(this.gameStateService.paused, this.collisionService);
    this.particleService.draw(this.canvasService.context);

    if (!this.gameStateService.paused) {
      this.cursor.draw();

      if (this.gameObjectService.objectsCleared()) {
        this.audioService.play('levelup.mp3');
        this.gameStateService.levelCleared();
      }
    }
  }

  play() {
    const name = localStorage.getItem('name');

    if (!!name) {
      this.mainMenuService.hide();
      this.newPlayerService.hide();
      this.newGame();
    } else {
      this.mainMenuService.hide();
      this.newPlayerService.show();
    }
  }

  private newGame() {
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
