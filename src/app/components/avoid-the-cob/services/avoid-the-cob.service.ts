import { inject, Injectable } from '@angular/core';
import { GameTextStore } from '../components/game-text/game-text.store';
import { MainMenuService } from '../components/main-menu/main-menu.service';
import { PlayerNameService } from '../components/player-name/player-name.service';
import { GameStateStore } from '../store/game-state.store';
import { AudioService } from './audio.service';
import { CollisionService } from './collision.service';
import { CursorService } from './cursor.service';
import { GameFlowService } from './game-flow.service';
import { GameObjectService } from './game-object.service';
import { ParticleService } from './particle.service';
import { PowerUpService } from './power-up.service';

@Injectable({
  providedIn: 'root',
})
export class AvoidTheCobService {
  private readonly audioService = inject(AudioService);
  private readonly collisionService = inject(CollisionService);
  private readonly cursor = inject(CursorService);
  private readonly gameFlow = inject(GameFlowService);
  private readonly gameObjectService = inject(GameObjectService);
  private readonly gameState = inject(GameStateStore);
  private readonly mainMenuService = inject(MainMenuService);
  private readonly nameService = inject(PlayerNameService);
  private readonly particleService = inject(ParticleService);
  private readonly powerUpService = inject(PowerUpService);
  private readonly textStore = inject(GameTextStore);

  public draw() {
    const paused = this.gameState.paused();

    this.gameObjectService.processGameObjects(paused, this.collisionService, this.gameState.mobMode());
    this.particleService.draw();

    if (this.gameState.level() > 0) {
      this.cursor.draw();
    }

    if (!paused) {
      this.gameFlow.checkLevelComplete();
    }
  }

  public play(mobMode: boolean) {
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

  public newGame(mobMode: boolean) {
    this.cursor.reset(mobMode);
    this.gameState.reset(mobMode);
    this.gameObjectService.reset();
    this.powerUpService.shufflePowerUps();
    this.audioService.playMusic();

    this.textStore.show(`Level ${this.gameState.level()}`, '', 2500).then(() => {
      this.gameFlow.start();
    });
  }
}
