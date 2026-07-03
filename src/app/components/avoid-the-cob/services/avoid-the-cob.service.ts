import { Injectable } from '@angular/core';
import { GameTextService } from '../components/game-text/game-text.service';
import { MainMenuService } from '../components/main-menu/main-menu.service';
import { PlayerNameService } from '../components/player-name/player-name.service';
import { AudioService } from './audio.service';
import { CollisionService } from './collision.service';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { GameObjectService } from './game-object.service';
import { GameStateService } from './game-state.service';
import { ParticleService } from './particle.service';
import { PowerUpService } from './power-up.service';

@Injectable({
  providedIn: 'root',
})
export class AvoidTheCobService {
  constructor(
    private audioService: AudioService,
    private collisionService: CollisionService,
    private cursor: CursorService,
    private difficultyService: DifficultyService,
    private gameObjectService: GameObjectService,
    private gameStateService: GameStateService,
    private mainMenuService: MainMenuService,
    private nameService: PlayerNameService,
    private particleService: ParticleService,
    private powerUpService: PowerUpService,
    private textService: GameTextService,
  ) {}

  draw() {
    const { mobMode, paused } = this.gameStateService;

    this.gameObjectService.processGameObjects(paused, this.collisionService, mobMode);
    this.particleService.draw();

    if (this.difficultyService.level > 0) {
      this.cursor.draw();
    }

    if (!paused) {
      this.gameStateService.checkLevelComplete(mobMode);
    }
  }

  play(mobMode: boolean) {
    const name = localStorage.getItem('name');
    this.mainMenuService.hide();

    if (mobMode) {
      this.newGame(true);
    } else {
      if (name) {
        this.nameService.hide();
        this.newGame(false);
      } else {
        this.nameService.show();
      }
    }
  }

  newGame(mobMode: boolean) {
    this.cursor.reset(mobMode);
    this.gameStateService.reset(mobMode);
    this.gameObjectService.reset();
    this.difficultyService.resetLevel();
    this.powerUpService.shufflePowerUps();
    this.audioService.playMusic();

    this.textService.show(`Level ${this.difficultyService.level}`, '', 2500).then(() => {
      this.gameStateService.start();
    });
  }
}
