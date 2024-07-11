import { Injectable } from '@angular/core';
import { CanvasService } from './game/canvas-service';
import { CornService } from './game/corn-service';
import { GameCursor } from './game/game-cursor';
import { MessageService } from './game/message-service';
import { PeaService } from './game/pea-service';

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

  constructor(
    private canvasService: CanvasService,
    private peaService: PeaService,
    private cornService: CornService,
    private cursor: GameCursor,
    private messageService: MessageService,
  ) {}

  play(newGame: boolean) {
    if (newGame) {
      this.resetDifficulty();
      this.toggleMenu();
      this.cursor.toggle();
    } else {
      this.increaseDifficulty();
    }

    this.peaService.createNewPeas(this.canvasService.screenW, this.canvasService.screenH);
    this.cornService.createNewCorn(this.canvasService.screenW, this.canvasService.screenH);

    this.unpause();
    this.immune(1500);
  }

  LevelUp() {
    this.ghost = true;
    this.level = this.level + 1;
    this.lives = this.level % 2 ? this.lives : this.lives + 1;
    this.pause();
    this.messageService.showMessage('Level ' + this.level, this.level % 2 ? '' : '+ 1', 2000);

    setTimeout(() => {
      this.play(false);
    }, 3500);
  }

  gameOver() {
    this.pause();
    this.messageService.showMessage('Game Over', 'You reached level ' + this.level, 3000);

    setTimeout(() => {
      this.toggleMenu();
      this.cursor.toggle();
    }, 4000);
  }

  private resetDifficulty() {
    this.peaService.reset();
    this.cornService.reset();
    this.cursor.reset();
    this.reset();
  }

  private increaseDifficulty() {
    this.peaService.levelUp();
    this.cornService.levelUp();
    this.cursor.shrink();
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  reset() {
    this.level = 1;
    this.lives = 3;
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
