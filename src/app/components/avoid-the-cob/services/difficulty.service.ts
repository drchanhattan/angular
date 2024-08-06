import { Injectable } from '@angular/core';
import { scaledSize } from '../models/device-scale/device-scale';
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

  increase(mobMode: boolean, cheatsEnabled: boolean) {
    this.level++;

    if (mobMode) {
      this.levelUpCursor(true);
      this.levelUpMob();
    } else {
      this.levelUpCursor(false);
      this.levelUpPeas();
      this.levelUpCorn();
      this.levelUpHearts();
      if (!cheatsEnabled) {
        this.levelUpPowerUps();
      }
    }
  }

  resetLevel() {
    this.level = 1;
  }

  private levelUpCursor(modeMode: boolean) {
    const minSize = scaledSize(modeMode ? 5 : 10);
    this.cursor.object.size = Math.max(GameObjectDefaults.cursor().size * Math.pow(0.98, this.level), minSize);
  }

  private levelUpCorn() {
    const defaultCorn = GameObjectDefaults.corn();

    // Size
    const minSize = scaledSize(20);
    const size = Math.max(defaultCorn.settings.size * Math.pow(0.99, this.level), minSize);
    // Speed
    const speed = Math.min(defaultCorn.settings.speed * Math.pow(1.001, this.level));
    // Count
    const defaultCount = defaultCorn.count;
    const maxCount = defaultCount * 5;
    const count = Math.min(defaultCount * Math.pow(1.05, this.level), maxCount);

    this.gameObjectService.corns.editSettings(size, speed, count);
  }

  private levelUpPeas() {
    const defaultPea = GameObjectDefaults.pea();

    // Size
    const minSize = scaledSize(10);
    const size = Math.max(defaultPea.settings.size * Math.pow(0.98, this.level), minSize);
    // Speed
    const speed = defaultPea.settings.speed * Math.pow(1.005, this.level);
    // Count
    const count = GameObjectDefaults.pea().count;

    this.gameObjectService.peas.editSettings(size, speed, count);
  }

  private levelUpHearts() {
    const hearts = this.gameObjectService.hearts;
    const defaultHeart = GameObjectDefaults.heart();

    // Size
    const minSize = scaledSize(10);
    const size = Math.max(defaultHeart.settings.size * Math.pow(0.98, this.level), minSize);
    // Speed
    const speed = defaultHeart.settings.speed;
    // Count
    const count = GameObjectDefaults.heart().count;

    hearts.editSettings(size, speed, count);
    this.level % this.powerUpFrequency === 0 ? hearts.destroyObjects() : hearts.createObjects();
  }

  private levelUpPowerUps() {
    const powerUps = this.gameObjectService.powerUps;
    const defaultPowerUp = GameObjectDefaults.powerUp();

    // Size
    const minSize = scaledSize(10);
    const size = Math.max(defaultPowerUp.settings.size * Math.pow(0.98, this.level), minSize);
    // Speed
    const speed = defaultPowerUp.settings.speed;
    // Count
    const count = GameObjectDefaults.powerUp().count;

    powerUps.editSettings(size, speed, count);
    this.level % this.powerUpFrequency === 0 ? powerUps.createObjects() : powerUps.destroyObjects();
  }

  private levelUpMob() {
    const defaultMob = GameObjectDefaults.mob();

    // Size
    const minSize = scaledSize(5);
    const size = Math.max(defaultMob.settings.size * Math.pow(0.98, this.level), minSize);
    // Speed
    const speed = Math.min(defaultMob.settings.speed * Math.pow(1.002, this.level));
    // Count
    const defaultCount = defaultMob.count;
    const maxCount = defaultCount * 3;
    const count = Math.min(defaultCount * Math.pow(1.03, this.level), maxCount);

    this.gameObjectService.mobs.editSettings(size, speed, count);
  }
}
