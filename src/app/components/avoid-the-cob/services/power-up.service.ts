import { Injectable } from '@angular/core';
import { GameObjectBehaviour } from '../models/game-object/game-object-behaviour';
import { AudioService } from './audio.service';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { GameObjectService } from './game-object.service';

@Injectable({
  providedIn: 'root',
})
export class PowerUpService {
  public powerUps = [
    this.powerInvincible.bind(this),
    this.powerMagnetise.bind(this),
    this.powerForceField.bind(this),
    this.powerTimeLock.bind(this),
    this.powerBlueCorn.bind(this),
  ];

  constructor(
    private readonly audioService: AudioService,
    private readonly cursor: CursorService,
    private readonly difficultyService: DifficultyService,
    private readonly gameObjectService: GameObjectService,
  ) {}

  public shufflePowerUps() {
    this.powerUps = this.powerUps.sort(() => Math.random() - 0.5);
  }

  public randomPowerUp() {
    const level = this.difficultyService.level;
    const frequency = this.difficultyService.powerUpFrequency;

    const powerUpIndex = (level / frequency - 1) % this.powerUps.length;

    this.powerUps[powerUpIndex]();
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Blueify);
  }

  public powerInvincible() {
    this.cursor.setInvincibility(true);
  }

  public powerMagnetise() {
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Magnetise);
  }

  public powerForceField() {
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.ForceField);
    this.gameObjectService.mobs.setBehaviour(GameObjectBehaviour.ForceField);
  }

  public powerTimeLock() {
    this.audioService.setMusicSpeed(0.75);
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.TimeLock);
    this.gameObjectService.mobs.setBehaviour(GameObjectBehaviour.TimeLock);
  }

  public powerBlueCorn() {
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.Blueify);
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.Magnetise);
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Magnetise);
  }
}
