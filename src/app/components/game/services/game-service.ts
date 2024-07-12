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
    this.peas = new GameObjectGroup(this.defaultPea.count, this.defaultPea.settings);
    this.corn = new GameObjectGroup(this.defaultCorn.count, this.defaultCorn.settings);
  }

  get defaultPea(): { count: number; settings: GameObjectSettings } {
    return {
      count: scaledCount(scaledSize(8), 3),
      settings: {
        color: '#54FF58',
        size: scaledSize(8),
        speed: scaledSpeed(scaledSize(8), 0.2),
        shape: GameObjectShape.Arc,
      },
    };
  }

  get defaultCorn(): { count: number; settings: GameObjectSettings } {
    return {
      count: scaledCount(scaledSize(12), 6),
      settings: {
        color: '#FFC107',
        size: scaledSize(12),
        speed: scaledSpeed(scaledSize(12), 0.2),
        shape: GameObjectShape.Rect,
      },
    };
  }

  play(newGame: boolean) {
    newGame ? this.newGame() : this.increaseDifficulty();

    this.peas.createObjects();
    this.corn.createObjects();

    this.unpause();
    this.immune(1500);
  }

  private newGame() {
    this.level = 1;
    this.lives = 3;

    this.peas.editSettings(this.defaultPea.settings.size, this.defaultPea.settings.speed, this.defaultPea.count);
    this.corn.editSettings(this.defaultCorn.settings.size, this.defaultCorn.settings.speed, this.defaultCorn.count);

    this.toggleMenu();

    this.cursor.reset();
    this.cursor.toggle();
  }

  private increaseDifficulty() {
    this.peas.editSettings(
      Math.max(this.peas.settings.size * 0.9, 10),
      this.peas.settings.speed * 1.03,
      scaledCount(this.peas.settings.size, 3),
    );
    this.corn.editSettings(
      Math.max(this.corn.settings.size * 0.9, 20),
      this.corn.settings.speed * 1.05,
      Math.min(this.corn.count * 1.1, 80),
    );
    this.cursor.increaseDifficulty();
  }

  levelUp() {
    this.ghost = true;
    this.level = this.level + 1;
    this.lives = this.level % 2 ? this.lives : this.lives + 1;
    this.pause();
    this.textService.show('Level ' + this.level, this.level % 2 ? '' : '+ 1', 2000);

    setTimeout(() => {
      this.play(false);
    }, 3500);
  }

  gameOver() {
    this.pause();
    this.textService.show('Game Over', 'You reached level ' + this.level, 3000);

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

  immune(duration: number) {
    this.ghost = true;

    setTimeout(() => {
      this.ghost = false;
    }, duration);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    const menu = document.getElementsByClassName('menu')[0].classList;
    menu.toggle('opacity-0');
    menu.toggle('pointer-events-none');
  }

  toggleInvincibility() {
    this.cursor.resetHistory();
    this.cursor.toggleTrail();
    this.invincible = !this.invincible;
  }

  setCursorMagnetism(obj: GameObject) {
    if (obj.behaviourEquals(GameObjectBehaviour.Attract)) {
      this.cursor.magnetise(obj, 30, 4, false);
    } else if (obj.behaviourEquals(GameObjectBehaviour.Repel)) {
      this.cursor.magnetise(obj, 20, 5, true);
    }
  }

  drawGameObjects(objects: GameObject[], handleCursorCollision: (obj: GameObject) => void) {
    objects.forEach((obj: GameObject) => {
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
    });
  }

  cursorPeaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursor.object)) {
      pea.destroyed = true;
      this.canvasService.createParticles(pea);
      this.peas.count--;

      if (this.peas.count === 0) {
        this.levelUp();
      }
    }
  }

  cursorCornCollision(corn: GameObject) {
    if (!this.ghost && corn.detectCollision(this.cursor.object)) {
      corn.destroyed = true;
      this.canvasService.createParticles(corn);

      if (!this.invincible) {
        this.lives--;
        this.canvasService.flash('bg-red-900', 500);
        this.immune(500);
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
