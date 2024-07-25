import { Injectable } from '@angular/core';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { CursorService } from './cursor.service';
import { GameObjectService } from './game-object-service';

@Injectable({
  providedIn: 'root',
})
export class DifficultyService {
  level!: number;
  powerUpFrequency = 3;

  constructor(
    private cursor: CursorService,
    private gameObjectService: GameObjectService,
  ) {}

  increase() {
    this.level++;
    this.levelUpPeas();
    this.levelUpCorn();
    this.levelUpPowerUps();
    this.levelUpHearts();
    this.levelUpCursor();
  }

  resetLevel() {
    this.level = 1;
  }

  private levelUpPeas() {
    const defaultSettings = GameObjectDefaults.pea().settings;
    const minSize = 10;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed * Math.pow(1.005, this.level);
    const count = GameObjectDefaults.pea().count;
    this.gameObjectService.peas.editSettings(size, speed, count);
  }

  private levelUpCorn() {
    const defaultSettings = GameObjectDefaults.corn().settings;
    const minSize = 20;
    const size = Math.max(defaultSettings.size * Math.pow(0.99, this.level), minSize);
    const speed = defaultSettings.speed * Math.pow(1.001, this.level);
    const count = Math.min(GameObjectDefaults.corn().count * Math.pow(1.06, this.level));
    this.gameObjectService.corn.editSettings(size, speed, count);
  }

  private levelUpPowerUps() {
    const powerUps = this.gameObjectService.powerUps;
    const defaultSettings = GameObjectDefaults.powerUp().settings;
    const minSize = 10;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed;
    const count = GameObjectDefaults.powerUp().count;
    powerUps.editSettings(size, speed, count);
    this.level % this.powerUpFrequency === 0 ? powerUps.createObjects() : powerUps.destroyObjects();
  }

  private levelUpHearts() {
    const hearts = this.gameObjectService.hearts;
    const defaultSettings = GameObjectDefaults.heart().settings;
    const minSize = 10;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed;
    const count = GameObjectDefaults.heart().count;
    hearts.editSettings(size, speed, count);
    this.level % this.powerUpFrequency === 0 ? hearts.destroyObjects() : hearts.createObjects();
  }

  private levelUpCursor() {
    const minSize = 10;
    this.cursor.object.size = Math.max(GameObjectDefaults.cursor().size * Math.pow(0.98, this.level), minSize);
  }
}
