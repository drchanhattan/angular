import { Injectable } from '@angular/core';
import { GameObjectBehaviour } from '../models/game-object/game-object-behaviour';
import { AudioService } from './audio-service';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { GameObjectService } from './game-object-service';

@Injectable({
  providedIn: 'root',
})
export class PowerUpService {
  powerUps = [
    this.powerInvincible.bind(this),
    this.powerMagnetise.bind(this),
    this.powerForceField.bind(this),
    this.powerTimeLock.bind(this),
    this.powerBlueCorn.bind(this),
  ];

  constructor(
    private audioService: AudioService,
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
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Blueify);
  }

  powerInvincible() {
    this.cursor.setInvincibility(true);
  }

  powerMagnetise() {
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Magnetise);
  }

  powerForceField() {
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.ForceField);
    this.gameObjectService.mobs.setBehaviour(GameObjectBehaviour.ForceField);
  }

  powerTimeLock() {
    this.audioService.setMusicSpeed(0.75);
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.TimeLock);
    this.gameObjectService.mobs.setBehaviour(GameObjectBehaviour.TimeLock);
  }

  powerBlueCorn() {
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.Blueify);
    this.gameObjectService.corns.setBehaviour(GameObjectBehaviour.Magnetise);
    this.gameObjectService.peas.setBehaviour(GameObjectBehaviour.Magnetise);
  }
}
