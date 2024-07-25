import { Injectable } from '@angular/core';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { GameObjectGroup } from '../models/game-object/game-object-group';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';

@Injectable({
  providedIn: 'root',
})
export class GameObjectService {
  peas: GameObjectGroup;
  corn: GameObjectGroup;
  powerUps: GameObjectGroup;
  hearts: GameObjectGroup;

  constructor() {
    this.peas = new GameObjectGroup(GameObjectDefaults.pea().count, GameObjectDefaults.pea().settings);
    this.corn = new GameObjectGroup(GameObjectDefaults.corn().count, GameObjectDefaults.corn().settings);
    this.powerUps = new GameObjectGroup(GameObjectDefaults.powerUp().count, GameObjectDefaults.powerUp().settings);
    this.hearts = new GameObjectGroup(GameObjectDefaults.heart().count, GameObjectDefaults.heart().settings);
  }

  reset() {
    this.resetObjectGroup(this.peas, GameObjectDefaults.pea());
    this.resetObjectGroup(this.corn, GameObjectDefaults.corn());
    this.resetObjectGroup(this.powerUps, GameObjectDefaults.powerUp());
    this.resetObjectGroup(this.hearts, GameObjectDefaults.heart());
  }

  private resetObjectGroup(objectGroup: GameObjectGroup, settings: { count: number; settings: GameObjectSettings }) {
    objectGroup.editSettings(settings.settings.size, settings.settings.speed, settings.count);
  }
}
