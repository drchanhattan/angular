import { Injectable } from '@angular/core';
import { scaledCount, scaledSize, scaledSpeed } from '../models/device-scale/device-scale';
import { GameCursor } from '../models/game-object/game-cursor';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectBehaviour } from '../models/game-object/game-object-behaviour';
import { GameObjectGroup } from '../models/game-object/game-object-group';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectShape } from '../models/game-object/game-object-shape';
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

  private createGroup(settings: { count: number; settings: GameObjectSettings }): GameObjectGroup {
    return new GameObjectGroup(settings.count, settings.settings);
  }

  private defaultSettings(sizeFactor: number, countFactor: number, color: string, shape: GameObjectShape) {
    const size = scaledSize(sizeFactor);
    return {
      count: scaledCount(size, countFactor),
      settings: {
        color,
        size,
        speed: scaledSpeed(size, 0.2),
        shape,
      },
    };
  }

  private defaultPeaSettings() {
    return this.defaultSettings(8, 3, '#54FF58', GameObjectShape.Arc);
  }

  private defaultCornSettings() {
    return this.defaultSettings(12, 6, '#FFC107', GameObjectShape.Rect);
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

  private setCursorMagnetism(obj: GameObject) {
    const isAttracting = obj.behaviourEquals(GameObjectBehaviour.Attract);
    const isRepelling = obj.behaviourEquals(GameObjectBehaviour.Repel);

    if (isAttracting) {
      this.cursor.magnetise(obj, 30, 4, false);
    } else if (isRepelling) {
      this.cursor.magnetise(obj, 20, 5, true);
    }
  }

  private handleGameObject(obj: GameObject, handleCursorCollision: (obj: GameObject) => void) {
    if (!obj.destroyed) {
      this.canvasService.drawObject(this.canvasService.context, obj);

      if (!this.paused) {
        obj.handleWallCollisions();
        handleCursorCollision(obj);
      } else {
        obj.applyForce('y', 8);
      }

      this.setCursorMagnetism(obj);
      obj.move();
    }
  }

  drawGameObjects(objects: GameObject[], handleCursorCollision: (obj: GameObject) => void) {
    objects.forEach((obj) => this.handleGameObject(obj, handleCursorCollision));
  }

  private cursorPeaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursor.object)) {
      pea.destroyed = true;
      this.canvasService.createParticles(pea);
      this.peas.count--;

      if (this.peas.count === 0) {
        this.levelUp();
      }
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
    this.drawGameObjects(this.peas.objects, this.cursorPeaCollision.bind(this));
  }

  drawCorn() {
    this.drawGameObjects(this.corn.objects, this.cursorCornCollision.bind(this));
  }

  drawCursor() {
    if (!this.showMenu) {
      this.cursor.draw(this.canvasService.context, this.canvasService);
    }
  }
}
