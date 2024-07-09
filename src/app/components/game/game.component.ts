import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
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
import { CornService } from './game/vegetables/corn-service';
import { PeaService } from './game/vegetables/pea-service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './game.component.html',
})
export class GameComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'fixed w-full h-full flex justify-center items-center bg-black text-nowrap';
  @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  devicePixelRatio = window.devicePixelRatio || 1;

  canvasService = new CanvasService();
  peaService = new PeaService();
  cornService = new CornService();
  cursorService = new CursorService();
  settings = new GameSettings();

  message = { text: '', subText: '' };

  constructor(private change: ChangeDetectorRef) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    window.location.reload();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyupHandler(event: KeyboardEvent) {
    if (event.key === '1') {
      this.#toggleInvincibility();
    }

    if (event.key === '2') {
      this.#togglePeaMagnet();
    }

    if (event.key === '3') {
      this.#toggleCornRepel();
    }
  }

  ngAfterViewInit() {
    this.canvasService.initCanvas(this.canvasEle);
    this.cursorService.initCursor(this.canvasService);
    this.animate();
  }

  animate() {
    const animateFrame = () => {
      this.canvasService.context.clearRect(0, 0, this.canvasService.screenW, this.canvasService.screenH);
      if (!this.settings.showMenu) {
        this.cursorService.draw(this.canvasService.context, this.canvasService);
      }
      this.#drawPeas();
      this.#drawCorn();
      this.#drawParticles();
      requestAnimationFrame(animateFrame);
    };
    animateFrame();
  }

  play(newGame: boolean) {
    if (newGame) {
      this.#resetDifficulty();
      this.settings.toggleMenu();
      this.cursorService.toggle();
    } else {
      this.#increaseDifficulty();
    }

    this.change.detectChanges();

    this.peaService.createNewPeas(this.canvasService.screenW, this.canvasService.screenH);
    this.cornService.createNewCorn(this.canvasService.screenW, this.canvasService.screenH);

    this.settings.unpause();
    this.#temporaryImmunity(1500);
  }

  #pause() {
    this.settings.paused = true;
    this.change.detectChanges();
  }

  #LevelUp() {
    this.settings.ghost = true;
    this.settings.level = this.settings.level + 1;
    this.settings.lives = this.settings.level % 2 ? this.settings.lives : this.settings.lives + 1;
    this.#pause();
    this.#showMessage('Level ' + this.settings.level, this.settings.level % 2 ? '' : '+ 1', 1000);

    setTimeout(() => {
      this.play(false);
    }, 3000);
  }

  #gameOver() {
    this.#pause();
    this.#showMessage('Game Over', 'You reached level ' + this.settings.level, 3000);

    setTimeout(() => {
      this.settings.toggleMenu();
      this.cursorService.toggle();
    }, 4000);
  }

  #resetDifficulty() {
    const zoomLevel = window.outerWidth / window.innerWidth;
    const multiplier = devicePixelRatio * zoomLevel;

    this.peaService.size = Math.round((multiplier ^ 50) * 0.5);
    this.peaService.count = Math.round(this.peaService.size / multiplier);
    this.peaService.speed = Math.round(this.peaService.size / multiplier) * 0.2;

    this.cornService.size = Math.round((multiplier ^ 50) * 0.8);
    this.cornService.count = Math.round(this.cornService.size / multiplier);
    this.cornService.speed = Math.round(this.cornService.size / multiplier) * 0.2;

    this.cursorService.size = Math.round((multiplier ^ 50) * 0.3);

    this.settings.lives = 3;
    this.settings.level = 1;
  }

  #increaseDifficulty() {
    // Increase difficulty settings
    this.peaService.count = 10;
    this.cornService.count = this.cornService.count * 1.1;
    this.peaService.speed = this.peaService.speed * 1.03;
    this.cornService.speed = this.cornService.speed * 1.01;

    this.peaService.size = this.peaService.size * 0.99;
    this.cornService.size = this.cornService.size * 0.99;
    this.cursorService.size = this.cursorService.size * 0.99;
  }

  #drawParticles() {
    this.canvasService.drawParticles(this.canvasService.context);
    this.canvasService.particleDecay();
  }

  #drawCorn() {
    this.cornService.corns.forEach((corn) => {
      if (!corn.destroyed) {
        // Draw a single Corn
        this.canvasService.drawObject(this.canvasService.context, corn);

        // Check for collision
        if (!this.settings.paused) {
          this.canvasService.wallCollision(corn);
          this.#detectCornCollision(corn);
        } else {
          // Apply Gravity if objects are not alive
          corn.applyForce(false, 8);
        }

        // Repel
        if (corn.behaviourEquals(GameObjectBehaviour.Repel)) {
          this.cursorService.magnetise(corn, 10, this.canvasService.screenW, this.canvasService.screenH, 2, true);
        }

        corn.move();
      }
    });
  }

  #drawPeas() {
    this.peaService.peas.forEach((pea) => {
      if (!pea.destroyed) {
        // Draw a single Pea
        this.canvasService.drawObject(this.canvasService.context, pea);

        // Check for collision
        if (!this.settings.paused) {
          this.canvasService.wallCollision(pea);
          this.#detectPeaCollision(pea);
        } else {
          // Apply Gravity if objects are not alive
          pea.applyForce(false, 8);
        }

        // Magnetise
        if (pea.behaviourEquals(GameObjectBehaviour.Magnetise)) {
          this.cursorService.magnetise(pea, 30, this.canvasService.screenW, this.canvasService.screenH, 1);
        }

        pea.move();
      }
    });
  }

  #detectPeaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursorService)) {
      pea.destroyed = true;
      this.canvasService.createParticles(pea);
      this.peaService.count = this.peaService.count - 1;
      this.change.detectChanges();

      if (this.peaService.count === 0) {
        this.#LevelUp();
      }
    }
  }

  #detectCornCollision(corn: GameObject) {
    if (!this.settings.ghost && corn.detectCollision(this.cursorService)) {
      corn.destroyed = true;
      this.canvasService.createParticles(corn);

      if (!this.settings.invincible) {
        this.settings.lives = this.settings.lives - 1;
        this.change.detectChanges();
        this.canvasService.flash('bg-red-900', 500);
        this.#temporaryImmunity(500);
      }

      if (this.settings.lives === 0) {
        this.#gameOver();
      }
    }
  }

  #toggleInvincibility() {
    this.cursorService.history = [];
    this.cursorService.trail = !this.cursorService.trail;
    this.settings.invincible = !this.settings.invincible;
  }

  #togglePeaMagnet() {
    this.peaService.peas.forEach((pea) => pea.toggleBehaviour(GameObjectBehaviour.Magnetise));
  }

  #toggleCornRepel() {
    this.cornService.corns.forEach((corn) => corn.toggleBehaviour(GameObjectBehaviour.Repel));
  }

  #temporaryImmunity(duration: number) {
    this.settings.ghost = true;

    setTimeout(() => {
      this.settings.ghost = false;
    }, duration);
  }

  #showMessage(text: string, subText: string, duration: number) {
    this.message.text = text;
    this.message.subText = subText;
    const messageClass = document.getElementsByClassName('message')[0].classList;

    messageClass.toggle('opacity-0');
    setTimeout(() => {
      messageClass.toggle('opacity-0');
    }, duration);
  }
}
