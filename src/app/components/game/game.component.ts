import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CanvasService } from './game/canvas/canvas-service';
import { Cursor as CursorService } from './game/cursor/cursor-service';
import { GameObject } from './game/game-object/game-object';
import { GameObjectBehaviour } from './game/game-object/game-object-behaviour';
import { GameSettings } from './game/game-settings/game-settings';
import { MessageService } from './game/message/message-service';
import { CornService } from './game/vegetables/corn-service';
import { PeaService } from './game/vegetables/pea-service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './game.component.html',
})
export class GameComponent implements AfterViewInit {
  @HostBinding('class') hostClasses =
    'fixed w-full h-full flex justify-center items-center bg-black text-nowrap';
  @ViewChild('canvas', { static: true })
  canvasEle!: ElementRef<HTMLCanvasElement>;

  canvasService = new CanvasService();
  peaService = new PeaService();
  cornService = new CornService();
  cursorService = new CursorService();
  settings = new GameSettings();
  messageService = new MessageService();

  @HostListener('window:resize', ['$event'])
  onResize() {
    window.location.reload();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyupHandler(event: KeyboardEvent) {
    if (event.key === '1') {
      this.invincible();
    }

    if (event.key === '2') {
      this.peaService.magnetise();
    }

    if (event.key === '3') {
      this.cornService.repel();
    }
  }

  ngAfterViewInit() {
    this.canvasService.init(this.canvasEle);
    this.cursorService.init(this.canvasService);
    this.animate();
  }

  animate() {
    const animateFrame = () => {
      this.canvasService.context.clearRect(
        0,
        0,
        this.canvasService.screenW,
        this.canvasService.screenH,
      );
      if (!this.settings.showMenu) {
        this.cursorService.draw(this.canvasService.context, this.canvasService);
      }
      this.drawPeas();
      this.drawCorn();
      this.drawParticles();
      requestAnimationFrame(animateFrame);
    };
    animateFrame();
  }

  play(newGame: boolean) {
    if (newGame) {
      this.resetDifficulty();
      this.settings.toggleMenu();
      this.cursorService.toggle();
    } else {
      this.increaseDifficulty();
    }

    this.peaService.createNewPeas(
      this.canvasService.screenW,
      this.canvasService.screenH,
    );
    this.cornService.createNewCorn(
      this.canvasService.screenW,
      this.canvasService.screenH,
    );

    this.settings.unpause();
    this.settings.immune(1500);
  }

  LevelUp() {
    this.settings.ghost = true;
    this.settings.level = this.settings.level + 1;
    this.settings.lives =
      this.settings.level % 2 ? this.settings.lives : this.settings.lives + 1;
    this.settings.pause();
    this.messageService.showMessage(
      'Level ' + this.settings.level,
      this.settings.level % 2 ? '' : '+ 1',
      1000,
    );

    setTimeout(() => {
      this.play(false);
    }, 3000);
  }

  gameOver() {
    this.settings.pause();
    this.messageService.showMessage(
      'Game Over',
      'You reached level ' + this.settings.level,
      3000,
    );

    setTimeout(() => {
      this.settings.toggleMenu();
      this.cursorService.toggle();
    }, 4000);
  }

  resetDifficulty() {
    this.peaService.reset();
    this.cornService.reset();
    this.cursorService.reset();
    this.settings.reset();
  }

  increaseDifficulty() {
    this.peaService.levelUp();
    this.cornService.levelUp();
    this.cursorService.levelUp();
  }

  drawParticles() {
    this.canvasService.drawParticles(this.canvasService.context);
    this.canvasService.particleDecay();
  }

  drawCorn() {
    this.cornService.corns.forEach((corn) => {
      if (!corn.destroyed) {
        // Draw a single Corn
        this.canvasService.drawObject(this.canvasService.context, corn);

        // Check for collision
        if (!this.settings.paused) {
          this.canvasService.wallCollision(corn);
          this.detectCornCollision(corn);
        } else {
          // Apply Gravity if objects are not alive
          corn.applyForce(false, 8);
        }

        // Repel
        if (corn.behaviourEquals(GameObjectBehaviour.Repel)) {
          this.cursorService.magnetise(corn, 10, 2, true);
        }

        corn.move();
      }
    });
  }

  drawPeas() {
    this.peaService.peas.forEach((pea) => {
      if (!pea.destroyed) {
        this.canvasService.drawObject(this.canvasService.context, pea);

        // Check for collision
        if (!this.settings.paused) {
          this.canvasService.wallCollision(pea);
          this.detectPeaCollision(pea);
        } else {
          // Apply Gravity if objects are not alive
          pea.applyForce(false, 8);
        }

        // Magnetise
        if (pea.behaviourEquals(GameObjectBehaviour.Magnetise)) {
          this.cursorService.magnetise(pea, 30, 4, false);
        }

        pea.move();
      }
    });
  }

  detectPeaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursorService)) {
      pea.destroyed = true;
      this.canvasService.createParticles(pea);
      this.peaService.count = this.peaService.count - 1;

      if (this.peaService.count === 0) {
        this.LevelUp();
      }
    }
  }

  detectCornCollision(corn: GameObject) {
    if (!this.settings.ghost && corn.detectCollision(this.cursorService)) {
      corn.destroyed = true;
      this.canvasService.createParticles(corn);

      if (!this.settings.invincible) {
        this.settings.lives = this.settings.lives - 1;
        this.canvasService.flash('bg-red-900', 500);
        this.settings.immune(500);
      }

      if (this.settings.lives === 0) {
        this.gameOver();
      }
    }
  }

  invincible() {
    this.cursorService.resetHistory();
    this.cursorService.toggleTrail();
    this.settings.toggleInvincible();
  }
}
