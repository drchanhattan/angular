import { Injectable } from '@angular/core';
import { CanvasService } from './game/canvas-service';
import { scaledCount, scaledSize, scaledSpeed } from './game/device-scale';
import { GameCursor } from './game/game-cursor';
import { GameObjectShape } from './game/game-object';
import { TextService } from './game/text-service';
import { VegetableGroup, VegetableSettings } from './game/vegetable-group';

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
  peas!: VegetableGroup;
  corn!: VegetableGroup;
  defaultPea: VegetableSettings = {
    color: '#54ff58',
    size: scaledSize(8),
    count: scaledCount(scaledSize(8), 3),
    speed: scaledSpeed(scaledSize(8), 0.2),
    shape: GameObjectShape.Arc,
  };
  defaultCorn: VegetableSettings = {
    color: '#ffc107',
    size: scaledSize(12),
    count: scaledCount(scaledSize(12), 6),
    speed: scaledSpeed(scaledSize(12), 0.2),
    shape: GameObjectShape.Rect,
  };

  constructor(
    private canvasService: CanvasService,
    private cursor: GameCursor,
    private textService: TextService,
  ) {
    this.peas = new VegetableGroup(this.defaultPea);
    this.corn = new VegetableGroup(this.defaultCorn);
  }

  play(newGame: boolean) {
    if (newGame) {
      this.resetDifficulty();
      this.toggleMenu();
      this.cursor.toggle();
    } else {
      this.increaseDifficulty();
    }

    this.peas.createVegetables();
    this.corn.createVegetables();

    this.unpause();
    this.immune(1500);
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

  private resetDifficulty() {
    this.level = 1;
    this.lives = 3;

    this.cursor.reset();
    this.peas.editSettings(this.defaultPea.size, this.defaultPea.count, this.defaultPea.speed);
    this.corn.editSettings(this.defaultCorn.size, this.defaultCorn.count, this.defaultCorn.speed);
  }

  private increaseDifficulty() {
    this.peas.editSettings(
      Math.max(this.peas.settings.size * 0.9, 10),
      scaledCount(this.peas.settings.size, 3),
      this.peas.settings.speed * 1.03,
    );
    this.corn.editSettings(
      Math.max(this.corn.settings.size * 0.9, 20),
      Math.min(this.corn.settings.count * 1.1, 80),
      this.corn.settings.speed * 1.05,
    );
    this.cursor.increaseDifficulty();
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

  toggleInvincible() {
    this.invincible = !this.invincible;
  }
}
