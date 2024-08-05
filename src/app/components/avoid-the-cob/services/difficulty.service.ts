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

  increase(mob: boolean) {
    this.level++;

    if (mob) {
      this.levelUpMob();
      this.levelUpCursor();
    } else {
      this.levelUpCursor();
      this.levelUpPeas();
      this.levelUpCorn();
      this.levelUpPowerUps();
      this.levelUpHearts();
    }
  }

  resetLevel() {
    this.level = 1;
  }

  private levelUpCursor() {
    const minSize = 10;
    this.cursor.object.size = Math.max(GameObjectDefaults.cursor().size * Math.pow(0.98, this.level), minSize);
  }

  private levelUpPeas() {
    const defaultPea = GameObjectDefaults.pea();

    // Size
    const minSize = 10;
    const size = Math.max(defaultPea.settings.size * Math.pow(0.98, this.level), minSize);
    // Speed
    const speed = defaultPea.settings.speed * Math.pow(1.005, this.level);
    // Count
    const count = GameObjectDefaults.pea().count;

    this.gameObjectService.peas.editSettings(size, speed, count);
  }

  private levelUpMob() {
    const defaultMob = GameObjectDefaults.mob();

    // Size
    const minSize = 20;
    const size = Math.max(defaultMob.settings.size * Math.pow(0.99, this.level), minSize);
    // Speed
    const speed = Math.min(defaultMob.settings.speed * Math.pow(1.001, this.level));
    // Count
    const defaultCount = defaultMob.count;
    const maxCount = defaultCount * 20;
    const count = Math.min(defaultCount * Math.pow(1.08, this.level), maxCount);

    this.gameObjectService.mob.editSettings(size, speed, count);
  }

  private levelUpPowerUps() {
    const powerUps = this.gameObjectService.powerUps;
    const defaultPowerUp = GameObjectDefaults.powerUp();

    // Size
    const minSize = 10;
    const size = Math.max(defaultPowerUp.settings.size * Math.pow(0.98, this.level), minSize);
    // Speed
    const speed = defaultPowerUp.settings.speed;
    // Count
    const count = GameObjectDefaults.powerUp().count;

    powerUps.editSettings(size, speed, count);
    this.level % this.powerUpFrequency === 0 ? powerUps.createObjects() : powerUps.destroyObjects();
  }

  private levelUpHearts() {
    const hearts = this.gameObjectService.hearts;
    const defaultHeart = GameObjectDefaults.heart();

    // Size
    const minSize = 10;
    const size = Math.max(defaultHeart.settings.size * Math.pow(0.98, this.level), minSize);
    // Speed
    const speed = defaultHeart.settings.speed;
    // Count
    const count = GameObjectDefaults.heart().count;

    hearts.editSettings(size, speed, count);
    this.level % this.powerUpFrequency === 0 ? hearts.destroyObjects() : hearts.createObjects();
  }

  private levelUpCorn() {
    const defaultCorn = GameObjectDefaults.corn();

    // Size
    const minSize = 20;
    const size = Math.max(defaultCorn.settings.size * Math.pow(0.99, this.level), minSize);
    // Speed
    const speed = Math.min(defaultCorn.settings.speed * Math.pow(1.001, this.level));
    // Count
    const defaultCount = defaultCorn.count;
    const maxCount = defaultCount * 5;
    const count = Math.min(defaultCount * Math.pow(1.05, this.level), maxCount);

    this.gameObjectService.corn.editSettings(size, speed, count);
  }
}
