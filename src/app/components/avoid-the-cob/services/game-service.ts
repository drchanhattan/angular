import { Injectable } from '@angular/core';
import { GameColors } from '../models/game-colors/game-colors';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { GameObjectGroup } from '../models/game-object/game-object-group';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectShape } from '../models/game-object/game-object-shape';
import { GameObjectType } from '../models/game-object/game-object-type';
import { GameObjectBehaviour } from './../models/game-object/game-object-behaviour';
import { CanvasService } from './canvas-service';
import { CursorService } from './cursor.service';
import { FirebaseService } from './firebase.service';
import { ParticleService } from './particle-service';
import { TextService } from './text-service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  level!: number;
  lives!: number;
  paused = true;
  showMenu = true;
  ghost = true;
  powerUpFrequency = 3;
  peas: GameObjectGroup;
  corn: GameObjectGroup;
  powerUps: GameObjectGroup;
  hearts: GameObjectGroup;

  constructor(
    private canvasService: CanvasService,
    private cursor: CursorService,
    private textService: TextService,
    private particleService: ParticleService,
    private firebaseService: FirebaseService,
  ) {
    this.peas = new GameObjectGroup(GameObjectDefaults.pea().count, GameObjectDefaults.pea().settings);
    this.corn = new GameObjectGroup(GameObjectDefaults.corn().count, GameObjectDefaults.corn().settings);
    this.powerUps = new GameObjectGroup(GameObjectDefaults.powerUp().count, GameObjectDefaults.powerUp().settings);
    this.hearts = new GameObjectGroup(GameObjectDefaults.heart().count, GameObjectDefaults.heart().settings);
  }

  // Game Initialization
  // ==============================

  newGame() {
    this.level = 1;
    this.lives = 3;
    this.resetObjectGroup(this.peas, GameObjectDefaults.pea());
    this.resetObjectGroup(this.corn, GameObjectDefaults.corn());
    this.resetObjectGroup(this.powerUps, GameObjectDefaults.powerUp());
    this.resetObjectGroup(this.hearts, GameObjectDefaults.heart());
    this.toggleMenu();
    this.cursor.reset();
    this.cursor.toggle();
    this.particleService.reset();
    this.textService.show(`Level ${this.level}`, '', 2500);

    setTimeout(() => {
      this.play();
    }, 3000);
  }

  private play() {
    this.peas.createObjects();
    this.corn.createObjects();
    this.hearts.createObjects();
    this.paused = false;
    this.cursor.blink(GameColors.Gray, 4, 125);
    this.activateImmunity(1000);
  }

  // Level and Game State Management
  // ==============================

  private levelComplete() {
    this.ghost = true;
    this.cursor.setInvincibility(false);
    this.level++;
    this.paused = true;

    this.textService.show(`Level ${this.level}`, this.hearts.objects[0].destroyed ? '+ 1' : '', 3500);

    setTimeout(() => {
      this.levelUp();
      this.play();
    }, 4000);
  }

  private levelUp() {
    this.levelUpPeas();
    this.levelUpCorn();
    this.levelUpPowerUps();
    this.levelUpHearts();
    this.levelUpCursor();

    if (this.level % this.powerUpFrequency === 0) {
      this.powerUps.createObjects();
    } else {
      this.powerUps.objects = [];
    }
  }

  private levelUpPeas() {
    const defaultSettings = GameObjectDefaults.pea().settings;
    const minSize = 10;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed * Math.pow(1.005, this.level);
    const count = GameObjectDefaults.pea().count;
    this.peas.editSettings(size, speed, count);
  }

  private levelUpCorn() {
    const defaultSettings = GameObjectDefaults.corn().settings;
    const minSize = 20;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed * Math.pow(1.002, this.level);
    const count = Math.min(GameObjectDefaults.corn().count * Math.pow(1.05, this.level));
    this.corn.editSettings(size, speed, count);
  }

  private levelUpPowerUps() {
    const defaultSettings = GameObjectDefaults.powerUp().settings;
    const minSize = 10;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed;
    const count = GameObjectDefaults.powerUp().count;
    this.powerUps.editSettings(size, speed, count);
  }

  private levelUpHearts() {
    const defaultSettings = GameObjectDefaults.heart().settings;
    const minSize = 10;
    const size = Math.max(defaultSettings.size * Math.pow(0.98, this.level), minSize);
    const speed = defaultSettings.speed;
    const count = GameObjectDefaults.heart().count;
    this.hearts.editSettings(size, speed, count);
  }

  private levelUpCursor() {
    const minSize = 10;
    this.cursor.object.size = Math.max(GameObjectDefaults.cursor().size * Math.pow(0.98, this.level), minSize);
  }

  private isLevelComplete() {
    const peas = this.peas.objects.some((pea) => !pea.destroyed && pea.isWithinViewport);
    const blueCorn = this.corn.objects.some((corn) => corn.isPea && !corn.destroyed && corn.isWithinViewport);
    return !peas && !blueCorn;
  }

  private gameOver() {
    this.firebaseService.saveScore(this.level);

    this.paused = true;
    this.textService.show('Game Over', `You reached level ${this.level}`, 5000);

    setTimeout(() => {
      this.toggleMenu();
      this.cursor.toggle();
    }, 6000);
  }

  private resetObjectGroup(objectGroup: GameObjectGroup, settings: { count: number; settings: GameObjectSettings }) {
    objectGroup.editSettings(settings.settings.size, settings.settings.speed, settings.count);
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
      const gravity = 0.05;
      this.cursor.object.magnetise(obj, 500, 7, true, false);
      this.particleService.create(obj, 1, 0.5);
      obj.deltaY = obj.deltaY + gravity;
    } else {
      if (attract) {
        this.cursor.object.magnetise(obj, 25, 4, false);
      }
      if (repel) {
        this.cursor.object.magnetise(obj, 20, 5, true);
      }
      if (blue) {
        obj.type = GameObjectType.Pea;
        obj.color = '#0055FF';
        obj.size = this.peas.objects[0].size;
        obj.shape = GameObjectShape.Circle;
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

      if (!this.ghost) {
        if (obj.isPea) {
          this.peaCollision(obj);
        } else if (obj.isCorn) {
          this.cornCollision(obj);
        } else if (obj.isPowerUp) {
          this.powerUpCollision(obj);
        } else if (obj.isHeart) {
          this.heartCollision(obj);
        }
      }

      if (this.isLevelComplete()) {
        this.levelComplete();
      }
    }
  }

  private peaCollision(pea: GameObject) {
    const collision = pea.detectCollision(this.cursor.object);
    if (collision) {
      pea.destroyed = true;
      this.particleService.create(pea, 20);
    }
  }

  private async cornCollision(corn: GameObject) {
    const collision = corn.detectCollision(this.cursor.object);
    if (collision) {
      corn.destroyed = true;
      this.particleService.create(corn);

      if (!this.cursor.invincible) {
        this.lives--;
        this.canvasService.flash(500, '#7F1D1D', 'animate-jiggle');
        this.activateImmunity(500);
      }

      if (this.lives === 0) {
        this.gameOver();
      }
    }
  }

  private powerUpCollision(powerUp: GameObject) {
    const collision = powerUp.detectCollision(this.cursor.object);
    if (collision) {
      powerUp.destroyed = true;
      this.particleService.create(powerUp, 100);
      this.canvasService.flash(500, '#1A40AF', 'animate-pulse');
      this.randomPowerUp();
    }
  }

  private heartCollision(heart: GameObject) {
    const collision = heart.detectCollision(this.cursor.object);
    if (collision) {
      heart.destroyed = true;
      this.particleService.create(heart, 8);
      this.lives++;
      this.cursor.blink(heart.color, 2, 100);
    }
  }

  // Power Ups
  // ==============================

  private randomPowerUp() {
    const powerUps = [
      this.powerAttract.bind(this),
      this.powerRepel.bind(this),
      this.powerSlowCorn.bind(this),
      this.powerAttract.bind(this),
      this.powerInvincible.bind(this),
      this.powerSlowCorn.bind(this),
      this.powerRepel.bind(this),
      this.powerBlueCorn.bind(this),
    ];

    if (this.level % this.powerUpFrequency === 0) {
      const powerUpIndex = (this.level / this.powerUpFrequency - 1) % powerUps.length;
      powerUps[powerUpIndex]();
      this.peas.setBehaviour(GameObjectBehaviour.Blue);
    }
  }

  private powerInvincible() {
    this.cursor.setInvincibility(true);
  }

  private powerAttract() {
    this.peas.setBehaviour(GameObjectBehaviour.Attract);
  }

  private powerRepel() {
    this.corn.setBehaviour(GameObjectBehaviour.Repel);
  }

  private powerBlueCorn() {
    this.corn.setBehaviour(GameObjectBehaviour.Blue);
    this.corn.setBehaviour(GameObjectBehaviour.Attract);
    this.peas.setBehaviour(GameObjectBehaviour.Attract);
  }

  private powerSlowCorn() {
    this.corn.setBehaviour(GameObjectBehaviour.Slow);
  }

  // Draw Objects
  // ==============================

  draw() {
    this.drawPeas();
    this.drawCorn();
    this.drawPowerUps();
    this.drawHearts();
    this.drawCursor();
  }

  private drawPeas() {
    this.peas.objects.forEach((obj) => this.handleGameObject(obj));
  }

  private drawCorn() {
    this.corn.objects.forEach((obj) => this.handleGameObject(obj));
  }

  private drawPowerUps() {
    this.powerUps.objects.forEach((obj) => this.handleGameObject(obj));
  }

  private drawHearts() {
    this.hearts.objects.forEach((obj) => this.handleGameObject(obj));
  }

  private drawCursor() {
    if (!this.showMenu) {
      this.cursor.draw(this.canvasService.context, this.canvasService);
    }
  }

  // Immunity and Menu Management
  // ==============================

  private activateImmunity(duration: number) {
    this.ghost = true;
    setTimeout(() => (this.ghost = false), duration);
  }

  private toggleMenu() {
    this.showMenu = !this.showMenu;
    const menuClassList = document.getElementsByClassName('menu')[0].classList;
    menuClassList.toggle('opacity-0');
    menuClassList.toggle('pointer-events-none');
  }
}
