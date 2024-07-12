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
  invincible = false;
  peas: GameObjectGroup;
  corn: GameObjectGroup;

  constructor(
    private canvasService: CanvasService,
    private cursor: GameCursor,
    private textService: TextService,
  ) {
    this.peas = this.createGroup(this.defaultPeaSettings());
    this.corn = this.createGroup(this.defaultCornSettings());
  }

  get levelComplete() {
    return ![...this.peas.objects, ...this.corn.objects].find((object) => object.isPea && !object.destroyed);
  }

  private createGroup(settings: { count: number; settings: GameObjectSettings }): GameObjectGroup {
    return new GameObjectGroup(settings.count, settings.settings);
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
      settings: {
        type,
        color,
        size,
        speed: scaledSpeed(size, 0.2),
        shape,
      },
    };
  }

  private defaultPeaSettings() {
    return this.defaultSettings(GameObjectType.Pea, 8, 3, '#54FF58', GameObjectShape.Arc);
  }

  private defaultCornSettings() {
    return this.defaultSettings(GameObjectType.Corn, 12, 6, '#FFC107', GameObjectShape.Rect);
  }

  play(newGame: boolean) {
    if (newGame) {
      this.startNewGame();
    } else {
      this.increaseDifficulty();
    }

    this.peas.createObjects();
    this.corn.createObjects();
    this.unpause();
    this.activateImmunity(1500);
  }

  private startNewGame() {
    this.level = 1;
    this.lives = 3;

    this.resetGroupSettings(this.peas, this.defaultPeaSettings());
    this.resetGroupSettings(this.corn, this.defaultCornSettings());

    this.toggleMenu();
    this.cursor.reset();
    this.cursor.toggle();
  }

  private resetGroupSettings(group: GameObjectGroup, settings: { count: number; settings: GameObjectSettings }) {
    group.editSettings(settings.settings.size, settings.settings.speed, settings.count);
  }

  private increaseDifficulty() {
    this.adjustGroupSettings(this.peas, 10, this.defaultPeaSettings().count);
    this.adjustGroupSettings(this.corn, 20, Math.min(this.corn.count * 1.1, 80));
    this.cursor.increaseDifficulty();
  }

  private adjustGroupSettings(group: GameObjectGroup, minSize: number, newCount: number) {
    group.editSettings(Math.max(group.settings.size * 0.9, minSize), group.settings.speed * 1.02, newCount);
  }

  levelUp() {
    this.ghost = true;
    this.level++;
    if (this.level % 2 === 0) {
      this.lives++;
    }

    this.pause();
    this.textService.show(`Level ${this.level}`, this.level % 2 === 0 ? '+ 1' : '', 2000);

    setTimeout(() => this.play(false), 3500);
  }

  gameOver() {
    this.pause();
    this.textService.show('Game Over', `You reached level ${this.level}`, 3000);

    setTimeout(() => {
      this.toggleMenu();
      this.cursor.toggle();
    }, 4000);
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  private activateImmunity(duration: number) {
    this.ghost = true;
    setTimeout(() => (this.ghost = false), duration);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    const menuClassList = document.getElementsByClassName('menu')[0].classList;
    menuClassList.toggle('opacity-0');
    menuClassList.toggle('pointer-events-none');
  }

  toggleInvincibility() {
    this.cursor.resetHistory();
    this.cursor.toggleTrail();
    this.invincible = !this.invincible;
  }

  private customObjectBehaviour(obj: GameObject) {
    const isAttracting = obj.behaviourEquals(GameObjectBehaviour.Attract);
    const isRepelling = obj.behaviourEquals(GameObjectBehaviour.Repel);
    const convertToPeas = obj.behaviourEquals(GameObjectBehaviour.ConvertToPea);

    if (this.paused) {
      obj.applyForce('y', 8);
    } else if (isAttracting) {
      this.cursor.magnetise(obj, 15, 4, false);
    } else if (isRepelling) {
      this.cursor.magnetise(obj, 20, 5, true);
    } else if (convertToPeas) {
      obj.type = GameObjectType.Pea;
      obj.color = this.peas.objects[0].color;
      obj.size = this.peas.objects[0].size;
      obj.shape = this.peas.objects[0].shape;
    }
  }

  private handleGameObject(obj: GameObject) {
    if (!obj.destroyed) {
      this.canvasService.drawObject(this.canvasService.context, obj);
      this.customObjectBehaviour(obj);
      this.handleCollisions(obj);
      obj.move();
    }
  }

  private handleCollisions(obj: GameObject) {
    if (!this.paused) {
      obj.handleWallCollisions();

      if (obj.isPea) {
        this.cursorPeaCollision(obj);
      } else if (obj.isCorn) {
        this.cursorCornCollision(obj);
      }

      if (this.levelComplete) {
        this.levelUp();
      }
    }
  }

  private cursorPeaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursor.object)) {
      pea.destroyed = true;
      this.canvasService.createParticles(pea);
    }
  }

  private cursorCornCollision(corn: GameObject) {
    if (!this.ghost && corn.detectCollision(this.cursor.object)) {
      corn.destroyed = true;
      this.canvasService.createParticles(corn);

      if (!this.invincible) {
        this.lives--;
        this.canvasService.flash('bg-red-900', 500);
        this.activateImmunity(500);
      }

      if (this.lives === 0) {
        this.gameOver();
      }
    }
  }

  drawPeas() {
    this.peas.objects.forEach((obj) => this.handleGameObject(obj));
  }

  drawCorn() {
    this.corn.objects.forEach((obj) => this.handleGameObject(obj));
  }

  drawCursor() {
    if (!this.showMenu) {
      this.cursor.draw(this.canvasService.context, this.canvasService);
    }
  }
}
