import { Injectable } from '@angular/core';
import { scaledCount, scaledSize, scaledSpeed } from '../models/device-scale/device-scale';
import { GameCursor } from '../models/game-object/game-cursor';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectGroup } from '../models/game-object/game-object-group';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectShape } from '../models/game-object/game-object-shape';
import { GameObjectType } from '../models/game-object/game-object-type';
import { GameObjectBehaviour } from './../models/game-object/game-object-behaviour';
import { CanvasService } from './canvas-service';
import { TextService } from './text-service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  level = 0;
  lives = 0;
  paused = true;
  showMenu = true;
  ghost = true;
  powerUpFrequency = 3;
  peas: GameObjectGroup;
  corn: GameObjectGroup;
  powerUps: GameObjectGroup;

  constructor(
    private canvasService: CanvasService,
    private cursor: GameCursor,
    private textService: TextService,
  ) {
    this.peas = new GameObjectGroup(this.defaultPeaSettings.count, this.defaultPeaSettings.settings);
    this.corn = new GameObjectGroup(this.defaultCornSettings.count, this.defaultCornSettings.settings);
    this.powerUps = new GameObjectGroup(this.defaultPowerUpSettings.count, this.defaultPowerUpSettings.settings);
  }

  // Game Initialization
  // ==============================

  play(newGame: boolean) {
    newGame ? this.startNewGame() : this.increaseDifficulty();
    this.peas.createObjects();
    this.corn.createObjects();
    this.paused = false;
    this.activateImmunity(400);
  }

  private startNewGame() {
    this.level = 1;
    this.lives = 3;

    this.resetGroupSettings(this.peas, this.defaultPeaSettings);
    this.resetGroupSettings(this.corn, this.defaultCornSettings);

    this.toggleMenu();
    this.cursor.reset();
    this.cursor.toggle();
  }

  // Level and Game State Management
  // ==============================

  levelUp() {
    this.ghost = true;
    this.cursor.setInvincibility(false);
    this.level++;
    this.lives++;
    this.paused = true;

    this.textService.show(`Level ${this.level}`, '+ 1', 2000);
    this.canvasService.flash(200, 'bg-stone-400');

    setTimeout(() => this.play(false), 3500);
  }

  private increaseDifficulty() {
    this.editGroupSettings(this.peas, 10, this.defaultPeaSettings.count);
    this.editGroupSettings(this.corn, 20, Math.min(this.corn.count * 1.08, 80));
    this.cursor.increaseDifficulty();

    if (this.level % this.powerUpFrequency === 0) {
      this.powerUps.createObjects();
    }
  }

  private editGroupSettings(group: GameObjectGroup, minSize: number, newCount: number) {
    group.editSettings(Math.max(group.settings.size * 0.98, minSize), group.settings.speed * 1.005, newCount);
  }

  gameOver() {
    this.paused = true;
    this.textService.show('Game Over', `You reached level ${this.level}`, 3000);

    setTimeout(() => {
      this.toggleMenu();
      this.cursor.toggle();
    }, 4000);
  }

  get levelComplete() {
    return ![...this.peas.objects, ...this.corn.objects].find((object) => object.isPea && !object.destroyed);
  }

  // Object Group Settings
  // ==============================

  private resetGroupSettings(group: GameObjectGroup, settings: { count: number; settings: GameObjectSettings }) {
    group.editSettings(settings.settings.size, settings.settings.speed, settings.count);
  }

  private defaultSettings(
    type: GameObjectType,
    sizeFactor: number,
    countFactor: number,
    color: string,
    shape: GameObjectShape,
  ) {
    const size = scaledSize(sizeFactor);
    return {
      count: scaledCount(size, countFactor),
      settings: new GameObjectSettings(type, color, size, shape, scaledSpeed(size, 0.1)),
    };
  }

  get defaultPeaSettings() {
    return this.defaultSettings(GameObjectType.Pea, 8, 2.5, '#54FF58', GameObjectShape.Circle);
  }

  get defaultCornSettings() {
    return this.defaultSettings(GameObjectType.Corn, 12, 3, '#FFC107', GameObjectShape.Square);
  }

  get defaultPowerUpSettings() {
    return this.defaultSettings(GameObjectType.PowerUp, 4, 0.5, 'blue', GameObjectShape.Circle);
  }

  // Object Handling
  // ==============================

  private handleGameObject(obj: GameObject) {
    if (!obj.destroyed) {
      this.canvasService.drawObject(this.canvasService.context, obj);
      this.customObjectBehaviour(obj);
      this.handleCollisions(obj);
      obj.move();
    }
  }

  private customObjectBehaviour(obj: GameObject) {
    const attract = obj.behaviourIncludes(GameObjectBehaviour.Attract);
    const repel = obj.behaviourIncludes(GameObjectBehaviour.Repel);
    const blue = obj.behaviourIncludes(GameObjectBehaviour.Blue);
    const slow = obj.behaviourIncludes(GameObjectBehaviour.Slow);

    if (this.paused) {
      obj.applyForce('y', 8);
    } else {
      if (attract) {
        this.cursor.object.magnetise(obj, 20, 4, false);
      }
      if (repel) {
        this.cursor.object.magnetise(obj, 20, 5, true);
      }
      if (blue) {
        obj.type = GameObjectType.Pea;
        obj.color = 'blue';
        obj.size = this.peas.objects[0].size;
        obj.shape = this.peas.objects[0].shape;
      }
      if (slow) {
        obj.deltaX = 1 * (Math.random() < 0.5 ? -1 : 1);
        obj.deltaY = 1 * (Math.random() < 0.5 ? -1 : 1);
      }
    }
  }

  // Collision Handling
  // ==============================

  private handleCollisions(obj: GameObject) {
    if (!this.paused) {
      obj.handleWallCollisions();

      if (obj.isPea) {
        this.peaCollision(obj);
      } else if (obj.isCorn) {
        this.cornCollision(obj);
      } else if (obj.isPowerUp) {
        this.powerUpCollision(obj);
      }

      if (this.levelComplete) {
        this.levelUp();
      }
    }
  }

  private peaCollision(pea: GameObject) {
    const collision = pea.detectCollision(this.cursor.object);
    if (collision) {
      pea.destroyed = true;
      this.canvasService.createParticles(pea);
    }
  }

  private cornCollision(corn: GameObject) {
    const collision = corn.detectCollision(this.cursor.object);
    if (!this.ghost && collision) {
      corn.destroyed = true;
      this.canvasService.createParticles(corn);

      if (!this.cursor.invincible) {
        this.lives--;
        this.canvasService.flash(500, 'bg-red-900', 'animate-jiggle');
        this.activateImmunity(500);
      }

      if (this.lives === 0) {
        this.gameOver();
      }
    }
  }

  private powerUpCollision(powerUp: GameObject) {
    const collision = powerUp.detectCollision(this.cursor.object);
    if (!this.ghost && collision) {
      powerUp.destroyed = true;
      this.canvasService.createParticles(powerUp, 100);
      this.randomPowerUp();
    }
  }

  // Power Ups
  // ==============================

  randomPowerUp() {
    const powerUps = [
      this.powerAttract.bind(this),
      this.powerSlowCorn.bind(this),
      this.powerInvincible.bind(this),
      this.powerBlueCorn.bind(this),
      this.powerRepel.bind(this),
    ];

    if (this.level % this.powerUpFrequency === 0) {
      const powerUpIndex = (this.level / this.powerUpFrequency - 1) % powerUps.length;
      powerUps[powerUpIndex]();
      this.peas.setBehaviour(GameObjectBehaviour.Blue);
      this.canvasService.flash(500, 'bg-blue-800', 'animate-pulse');
    }
  }

  powerInvincible() {
    this.cursor.setInvincibility(true);
  }

  powerAttract() {
    this.peas.setBehaviour(GameObjectBehaviour.Attract);
  }

  powerRepel() {
    this.corn.setBehaviour(GameObjectBehaviour.Repel);
  }

  powerBlueCorn() {
    this.corn.setBehaviour(GameObjectBehaviour.Blue);
    this.corn.setBehaviour(GameObjectBehaviour.Attract);
    this.peas.setBehaviour(GameObjectBehaviour.Attract);
  }

  powerSlowCorn() {
    this.corn.setBehaviour(GameObjectBehaviour.Slow);
  }

  // Draw Objects
  // ==============================

  drawPeas() {
    this.peas.objects.forEach((obj) => this.handleGameObject(obj));
  }

  drawCorn() {
    this.corn.objects.forEach((obj) => this.handleGameObject(obj));
  }

  drawPowerUps() {
    this.powerUps.objects.forEach((obj) => this.handleGameObject(obj));
  }

  drawCursor() {
    if (!this.showMenu) {
      this.cursor.draw(this.canvasService.context, this.canvasService);
    }
  }

  // Immunity and Menu Management
  // ==============================

  activateImmunity(duration: number) {
    this.ghost = true;
    setTimeout(() => (this.ghost = false), duration);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    const menuClassList = document.getElementsByClassName('menu')[0].classList;
    menuClassList.toggle('opacity-0');
    menuClassList.toggle('pointer-events-none');
  }
}
