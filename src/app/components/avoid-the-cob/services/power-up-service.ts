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

  private powerInvincible() {
    this.cursor.setInvincibility(true);
  }

  private powerAttract() {
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Attract);
  }

  private powerRepel() {
    this.gameObjectService.corn.setBehaviour(GameObjectBehaviour.Repel);
  }

  private powerBlueCorn() {
    this.gameObjectService.corn.setBehaviour(GameObjectBehaviour.Blue);
    this.gameObjectService.corn.setBehaviour(GameObjectBehaviour.Attract);
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Attract);
  }

  private powerSlowCorn() {
    this.gameObjectService.corn.setBehaviour(GameObjectBehaviour.Slow);
  }
}
