import { Injectable } from '@angular/core';
import { GameTextService } from '../components/game-text/game-text-service';
import { LeaderboardService } from '../components/leaderboard/leaderboard-service';
import { MainMenuService } from '../components/main-menu/main-menu-service';
import { PlayerNameService } from '../components/player-name/player-name-service';
import { GameColors } from '../models/game-colors/game-colors';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectShape } from '../models/game-object/game-object-shape';
import { GameObjectType } from '../models/game-object/game-object-type';
import { GameObjectBehaviour } from './../models/game-object/game-object-behaviour';
import { CanvasService } from './canvas-service';
import { CursorService } from './cursor.service';
import { DifficultyService } from './difficulty.service';
import { FirebaseService } from './firebase.service';
import { ObjectService } from './object-service';
import { ParticleService } from './particle-service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  paused = true;
  ghost = true;

  constructor(
    private canvasService: CanvasService,
    private cursor: CursorService,
    private difficultyService: DifficultyService,
    private firebaseService: FirebaseService,
    private leaderboardService: LeaderboardService,
    private mainMenuService: MainMenuService,
    private objectService: ObjectService,
    private particleService: ParticleService,
    private playerNameService: PlayerNameService,
    private textService: GameTextService,
  ) {}

  // Game Initialization
  // ==============================

  play() {
    const name = window.localStorage.getItem('name');

    if (!!name) {
      this.mainMenuService.hide();
      this.playerNameService.hide();
      this.newGame();
    } else {
      this.mainMenuService.hide();
      this.playerNameService.show();
    }
  }

  private newGame() {
    this.difficultyService.resetLevel();
    this.difficultyService.resetLives();
    this.objectService.reset();
    this.cursor.reset();
    this.cursor.hide();
    this.textService.show(`Level ${this.difficultyService.level}`, '', 2500);

    setTimeout(() => {
      this.start();
    }, 3000);
  }

  private start() {
    this.objectService.peas.createObjects();
    this.objectService.corn.createObjects();
    this.paused = false;
    this.cursor.blink(GameColors.Gray, 4, 125);
    this.activateImmunity(1000);
  }

  // Level and Game State Management
  // ==============================

  private endLevel() {
    this.ghost = true;
    this.cursor.setInvincibility(false);
    this.difficultyService.level++;
    this.paused = true;
    this.levelUpText();

    setTimeout(() => {
      this.levelUp();
      this.start();
    }, 4000);
  }

  private levelUp() {
    this.difficultyService.levelUpPeas();
    this.difficultyService.levelUpCorn();
    this.difficultyService.levelUpPowerUps();
    this.difficultyService.levelUpHearts();
    this.difficultyService.levelUpCursor();
  }

  private levelUpText() {
    const collectedHearts = this.objectService.hearts.objects.filter((heart) => heart.isDestroyed).length;
    const subtext = collectedHearts ? `+ ${collectedHearts}` : '';
    this.textService.show(`Level ${this.difficultyService.level}`, subtext, 3500);
  }

  private levelCompleted() {
    const peas = this.objectService.peas.objects;
    const blueCorn = this.objectService.corn.objects.filter((corn) => corn.isPea);
    const powerUps = this.objectService.powerUps.objects;

    return ![...peas, ...blueCorn, ...powerUps].some((obj) => !obj.isDestroyed && obj.isWithinViewport);
  }

  private gameOver() {
    this.paused = true;
    this.firebaseService.saveScore(this.difficultyService.level);
    this.textService.show('Game Over', `You reached level ${this.difficultyService.level}`, 5000);

    setTimeout(() => {
      this.leaderboardService.show();
      this.cursor.show();
    }, 6000);
  }

  // Object Handling
  // ==============================

  private handleGameObject(obj: GameObject) {
    if (!obj.isDestroyed) {
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
      this.cursor.object.magnetise(obj, 500, 7, true, false);
      this.particleService.create(obj, 1, 0.5);
      obj.deltaY = obj.deltaY + 0.075;
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
        obj.size = this.objectService.peas.objects[0].size;
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

      if (this.levelCompleted()) {
        this.endLevel();
      }
    }
  }

  private peaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursor.object)) {
      pea.destroy();
      this.particleService.create(pea, 20);
    }
  }

  private async cornCollision(corn: GameObject) {
    if (corn.detectCollision(this.cursor.object)) {
      corn.destroy();
      this.particleService.create(corn);

      if (!this.cursor.invincible) {
        this.difficultyService.lives--;
        this.canvasService.flash(500, '#7F1D1D', 'animate-jiggle');
        this.activateImmunity(500);
      }

      if (this.difficultyService.lives === 0) {
        this.gameOver();
      }
    }
  }

  private powerUpCollision(powerUp: GameObject) {
    if (powerUp.detectCollision(this.cursor.object)) {
      powerUp.destroy();
      this.particleService.create(powerUp, 100);
      this.canvasService.flash(500, '#1A40AF', 'animate-pulse');
      this.randomPowerUp();
    }
  }

  private heartCollision(heart: GameObject) {
    if (heart.detectCollision(this.cursor.object)) {
      heart.destroy();
      this.particleService.create(heart, 8);
      this.difficultyService.lives++;
      this.cursor.blink(heart.color, 2, 100);
    }
  }

  // Power Ups
  // ==============================

  private randomPowerUp() {
    if (this.difficultyService.level % this.difficultyService.powerUpFrequency === 0) {
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

      const powerUpIndex =
        (this.difficultyService.level / this.difficultyService.powerUpFrequency - 1) % powerUps.length;
      powerUps[powerUpIndex]();
      this.objectService.peas.setBehaviour(GameObjectBehaviour.Blue);
    }
  }

  private powerInvincible() {
    this.cursor.setInvincibility(true);
  }

  private powerAttract() {
    this.objectService.peas.setBehaviour(GameObjectBehaviour.Attract);
  }

  private powerRepel() {
    this.objectService.corn.setBehaviour(GameObjectBehaviour.Repel);
  }

  private powerBlueCorn() {
    this.objectService.corn.setBehaviour(GameObjectBehaviour.Blue);
    this.objectService.corn.setBehaviour(GameObjectBehaviour.Attract);
    this.objectService.peas.setBehaviour(GameObjectBehaviour.Attract);
  }

  private powerSlowCorn() {
    this.objectService.corn.setBehaviour(GameObjectBehaviour.Slow);
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
    this.objectService.peas.objects.forEach((obj) => this.handleGameObject(obj));
  }

  private drawCorn() {
    this.objectService.corn.objects.forEach((obj) => this.handleGameObject(obj));
  }

  private drawPowerUps() {
    this.objectService.powerUps.objects.forEach((obj) => this.handleGameObject(obj));
  }

  private drawHearts() {
    this.objectService.hearts.objects.forEach((obj) => this.handleGameObject(obj));
  }

  private drawCursor() {
    if (!this.paused) {
      this.cursor.draw(this.canvasService.context, this.canvasService);
    }
  }

  // Immunity and Menu Management
  // ==============================

  private activateImmunity(duration: number) {
    this.ghost = true;
    setTimeout(() => (this.ghost = false), duration);
  }
}
