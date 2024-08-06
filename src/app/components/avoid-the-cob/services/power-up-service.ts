import { Injectable } from '@angular/core';
import { GameObjectBehaviour } from '../models/game-object/game-object-behaviour';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { GameObjectService } from './game-object-service';

@Injectable({
  providedIn: 'root',
})
export class PowerUpService {
  powerUps = [
    this.powerInvincible.bind(this),
    this.powerAttract.bind(this),
    this.powerRepel.bind(this),
    this.powerSlowCorn.bind(this),
    this.powerBlueCorn.bind(this),
  ];

  constructor(
    private cursor: CursorService,
    private difficultyService: DifficultyService,
    private gameObjectService: GameObjectService,
  ) {}

  shufflePowerUps() {
    this.powerUps = this.powerUps.sort(() => Math.random() - 0.5);
  }

  randomPowerUp() {
    const level = this.difficultyService.level;
    const frequency = this.difficultyService.powerUpFrequency;

    const powerUpIndex = (level / frequency - 1) % this.powerUps.length;

    this.powerUps[powerUpIndex]();
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
