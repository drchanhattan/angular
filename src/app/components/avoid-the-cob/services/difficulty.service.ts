import { inject, Injectable } from '@angular/core';
import { scaledSize } from '../models/device-scale/device-scale';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { CursorService } from './cursor.service';
import { GameObjectService } from './game-object.service';

@Injectable({
  providedIn: 'root',
})
export class DifficultyService {
  private readonly cursor = inject(CursorService);
  private readonly gameObjectService = inject(GameObjectService);

  public readonly powerUpFrequency = 3;

  public increase(level: number, mobMode: boolean, cheatsEnabled: boolean) {
    if (mobMode) {
      this.levelUpCursor(level, true);
      this.levelUpMob(level);
    } else {
      this.levelUpCursor(level, false);
      this.levelUpPeas(level);
      this.levelUpCorn(level);
      this.levelUpHearts(level);
      if (!cheatsEnabled) {
        this.levelUpPowerUps(level);
      }
    }
  }

  private levelUpCursor(level: number, modeMode: boolean) {
    const minSize = scaledSize(modeMode ? 5 : 10);
    this.cursor.object.size = Math.max(this.cursor.cursorSize(modeMode) * Math.pow(0.98, level), minSize);
  }

  private levelUpCorn(level: number) {
    const defaultCorn = GameObjectDefaults.corn();

    // Size
    const minSize = scaledSize(20);
    const size = Math.max(defaultCorn.settings.size * Math.pow(0.98, level), minSize);
    // Speed
    const speed = Math.min(defaultCorn.settings.speed * Math.pow(1.001, level));
    // Count
    const defaultCount = defaultCorn.count;
    const maxCount = defaultCount * 5;
    const count = Math.min(defaultCount * Math.pow(1.05, level), maxCount);

    this.gameObjectService.corns.editSettings(size, speed, count);
  }

  private levelUpPeas(level: number) {
    const defaultPea = GameObjectDefaults.pea();

    // Size
    const minSize = scaledSize(10);
    const size = Math.max(defaultPea.settings.size * Math.pow(0.98, level), minSize);
    // Speed
    const speed = defaultPea.settings.speed * Math.pow(1.005, level);
    // Count
    const count = GameObjectDefaults.pea().count;

    this.gameObjectService.peas.editSettings(size, speed, count);
  }

  private levelUpHearts(level: number) {
    const hearts = this.gameObjectService.hearts;
    const defaultHeart = GameObjectDefaults.heart();

    // Size
    const minSize = scaledSize(10);
    const size = Math.max(defaultHeart.settings.size * Math.pow(0.98, level), minSize);
    // Speed
    const speed = defaultHeart.settings.speed;
    // Count
    const count = GameObjectDefaults.heart().count;

    hearts.editSettings(size, speed, count);
    level % this.powerUpFrequency === 0 ? hearts.destroyObjects() : hearts.createObjects();
  }

  private levelUpPowerUps(level: number) {
    const powerUps = this.gameObjectService.powerUps;
    const defaultPowerUp = GameObjectDefaults.powerUp();

    // Size
    const minSize = scaledSize(10);
    const size = Math.max(defaultPowerUp.settings.size * Math.pow(0.98, level), minSize);
    // Speed
    const speed = defaultPowerUp.settings.speed;
    // Count
    const count = GameObjectDefaults.powerUp().count;

    powerUps.editSettings(size, speed, count);
    level % this.powerUpFrequency === 0 ? powerUps.createObjects() : powerUps.destroyObjects();
  }

  private levelUpMob(level: number) {
    const defaultMob = GameObjectDefaults.mob();

    // Size
    const minSize = scaledSize(5);
    const size = Math.max(defaultMob.settings.size * Math.pow(0.98, level), minSize);
    // Speed
    const speed = Math.min(defaultMob.settings.speed * Math.pow(1.004, level));
    // Count
    const defaultCount = defaultMob.count;
    const maxCount = defaultCount * 3;
    const count = Math.min(defaultCount * Math.pow(1.03, level), maxCount);

    this.gameObjectService.mobs.editSettings(size, speed, count);
  }
}
