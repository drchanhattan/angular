import { Injectable } from '@angular/core';
import { GameObjectBehaviour } from '../models/game-object/game-object-behaviour';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { GameObjectService } from './game-object-service';

@Injectable({
  providedIn: 'root',
})
export class PowerUpService {
  constructor(
    private cursor: CursorService,
    private difficultyService: DifficultyService,
    private gameObjectService: GameObjectService,
  ) {}

  randomPowerUp() {
    const level = this.difficultyService.level;
    const frequency = this.difficultyService.powerUpFrequency;

    const powerUps = [
      this.powerAttract.bind(this),
      this.powerRepel.bind(this),
      this.powerSlowCorn.bind(this),
      this.powerAttract.bind(this),
      this.powerInvincible.bind(this),
      this.powerSlowCorn.bind(this),
      this.powerRepel.bind(this),
      this.powerBlueCorn.bind(this),
    ];
    const powerUpIndex = (level / frequency - 1) % powerUps.length;

    powerUps[powerUpIndex]();
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Blue);
  }

  powerInvincible() {
    this.cursor.setInvincibility(true);
  }

  powerAttract() {
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Attract);
  }

  powerRepel() {
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.Repel);
    this.gameObjectService.mobs.setBehaviour(GameObjectBehaviour.Repel);
  }

  powerSlowCorn() {
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.Slow);
    this.gameObjectService.mobs.setBehaviour(GameObjectBehaviour.Slow);
  }

  powerBlueCorn() {
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.Blue);
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.Attract);
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Attract);
  }
}
