import { Injectable } from '@angular/core';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { GameObjectGroup } from '../models/game-object/game-object-group';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { CursorService } from './cursor.service';

@Injectable({
  providedIn: 'root',
})
export class DifficultyService {
  level!: number;
  lives!: number;
  powerUpFrequency = 3;

  constructor(private cursor: CursorService) {}

  resetLevel() {
    this.level = 1;
  }

  resetLives() {
    this.lives = 3;
  }

  resetObjectGroup(objectGroup: GameObjectGroup, settings: { count: number; settings: GameObjectSettings }) {
    objectGroup.editSettings(settings.settings.size, settings.settings.speed, settings.count);
  }

  levelUpPeas(peas: GameObjectGroup) {
    const defaultSettings = GameObjectDefaults.pea().settings;
    const minSize = 10;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed * Math.pow(1.005, this.level);
    const count = GameObjectDefaults.pea().count;
    peas.editSettings(size, speed, count);
  }

  levelUpCorn(corn: GameObjectGroup) {
    const defaultSettings = GameObjectDefaults.corn().settings;
    const minSize = 20;
    const size = Math.max(defaultSettings.size * Math.pow(0.99, this.level), minSize);
    const speed = defaultSettings.speed * Math.pow(1.001, this.level);
    const count = Math.min(GameObjectDefaults.corn().count * Math.pow(1.06, this.level));
    corn.editSettings(size, speed, count);
  }

  levelUpPowerUps(powerUps: GameObjectGroup) {
    const defaultSettings = GameObjectDefaults.powerUp().settings;
    const minSize = 10;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed;
    const count = GameObjectDefaults.powerUp().count;
    powerUps.editSettings(size, speed, count);
    this.level % this.powerUpFrequency === 0 ? powerUps.createObjects() : powerUps.destroyObjects();
  }

  levelUpHearts(hearts: GameObjectGroup) {
    const defaultSettings = GameObjectDefaults.heart().settings;
    const minSize = 10;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed;
    const count = GameObjectDefaults.heart().count;
    hearts.editSettings(size, speed, count);
    this.level % this.powerUpFrequency === 0 ? hearts.destroyObjects() : hearts.createObjects();
  }

  levelUpCursor() {
    const minSize = 10;
    this.cursor.object.size = Math.max(GameObjectDefaults.cursor().size * Math.pow(0.98, this.level), minSize);
  }
}
