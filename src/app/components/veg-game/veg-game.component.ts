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
import { Canvas } from './game/canvas/canvas';
import { Cursor } from './game/cursor/cursor';
import { GameObject } from './game/game-object/game-object';
import { GameObjectBehaviour } from './game/game-object/game-object-behaviour';
import { CornService } from './game/vegetables/corn-service';
import { PeaService } from './game/vegetables/pea-service';

@Component({
  selector: 'app-veg-game',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './veg-game.component.html',
})
export class VegGameComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'fixed w-full h-full flex justify-center items-center bg-black';

  @ViewChild('canvas', { static: true })
  canvasEle!: ElementRef<HTMLCanvasElement>;
  screenW!: number;
  screenH!: number;
  context!: CanvasRenderingContext2D;
  canvas = new Canvas();
  peaService = new PeaService();
  cornService = new CornService();
  cursor = new Cursor();

  lives = 0;
  idle = true;
  paused = false;
  level!: number;
  ghost = true;
  invincible = false;
  message = { text: '', subText: '' };

  constructor(private change: ChangeDetectorRef) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.idle) {
      this.#gameOver();
    }
    this.setupCanvas();
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
    this.setupCanvas();
    this.cursor.track(this.context, this.canvas);
    this.animate();
  }

  setupCanvas() {
    const canvas = this.canvasEle.nativeElement;
    const devicePixelRatio = window.devicePixelRatio || 1;
    this.screenW = window.innerWidth;
    this.screenH = window.innerHeight;
    canvas.width = this.screenW * devicePixelRatio;
    canvas.height = this.screenH * devicePixelRatio;
    this.context = canvas.getContext('2d')!;
    this.context.scale(devicePixelRatio, devicePixelRatio);
    this.canvas.w = this.screenW;
    this.canvas.h = this.screenH;
  }

  animate() {
    const animateFrame = () => {
      this.context.clearRect(0, 0, this.canvas.w, this.canvas.h);
      if (!this.idle) {
        this.cursor.draw(this.context, this.canvas);
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
      this.#toggleMenu(true);
    } else {
      this.#increaseDifficulty();
    }

    this.change.detectChanges();

    this.peaService.createNewPeas(this.canvas.w, this.canvas.h);
    this.cornService.createNewCorn(this.canvas.w, this.canvas.h);

    this.paused = false;
    this.#temporaryImmunity(1500);
  }

  #pause(duration: number) {
    this.paused = true;
    this.change.detectChanges();
    this.#showMessage(duration);
  }

  #LevelUp() {
    this.ghost = true;
    this.level = this.level + 1;
    this.message.text = 'Level ' + this.level;
    this.message.subText = this.level % 2 ? '' : '+ 1 life';
    this.#pause(1000);

    setTimeout(() => {
      this.play(false);
    }, 3000);
  }

  #gameOver() {
    this.idle = true;
    this.message.text = 'Game Over';
    this.message.subText = 'You reached level ' + this.level;
    this.#pause(3000);

    setTimeout(() => {
      this.#toggleMenu(false);
    }, 4000);
  }

  #resetDifficulty() {
    // Reset params back to default
    this.peaService.count = 10;
    this.peaService.size = 20;
    this.peaService.speed = 0.8;

    this.cornService.count = 20;
    this.cornService.size = 25;
    this.cornService.speed = 0.5;

    this.cursor.size = 10;

    this.lives = 3;
    this.level = 1;
    this.idle = false;
    this.message = { text: '', subText: '' };
  }

  #increaseDifficulty() {
    // Increase difficulty settings
    this.peaService.count = 10;
    this.cornService.count = this.cornService.count * 1.1;
    this.peaService.speed = this.peaService.speed * 1.03;
    this.cornService.speed = this.cornService.speed * 1.01;

    this.peaService.size = this.peaService.size * 0.99;
    this.cornService.size = this.cornService.size * 0.99;
    this.cursor.size = this.cursor.size * 0.99;

    // Add additional life every 2 levels
    this.lives = this.level % 2 ? this.lives : this.lives + 1;
  }

  #drawParticles() {
    this.canvas.drawParticles(this.context);
    this.canvas.particleDecay();
  }

  #drawCorn() {
    this.cornService.corns.forEach((corn) => {
      if (!corn.destroyed) {
        // Draw a single Corn
        this.canvas.drawObject(this.context, corn);

        // Check for collision
        if (!this.paused) {
          this.canvas.wallCollision(corn);
          this.#detectCornCollision(corn);
        } else {
          // Apply Gravity if objects are not alive
          corn.applyForce(false, 2.5);
        }

        // Repel
        if (corn.behaviourEquals(GameObjectBehaviour.Repel)) {
          this.cursor.magnetise(corn, 10, this.canvas, 2, true);
        }

        corn.move();
      }
    });
  }

  #drawPeas() {
    this.peaService.peas.forEach((pea) => {
      if (!pea.destroyed) {
        // Draw a single Pea
        this.canvas.drawObject(this.context, pea);

        // Check for collision
        if (!this.paused) {
          this.canvas.wallCollision(pea);
          this.#detectPeaCollision(pea);
        } else {
          // Apply Gravity if objects are not alive
          pea.applyForce(false, 2.5);
        }

        // Magnetise
        if (pea.behaviourEquals(GameObjectBehaviour.Magnetise)) {
          this.cursor.magnetise(pea, 30, this.canvas, 1);
        }

        pea.move();
      }
    });
  }

  #detectPeaCollision(pea: GameObject) {
    if (pea.detectCollision(this.cursor)) {
      pea.destroyed = true;
      this.canvas.createParticles(pea);
      this.peaService.count = this.peaService.count - 1;
      this.change.detectChanges();

      if (this.peaService.count === 0) {
        this.#LevelUp();
      }
    }
  }

  #detectCornCollision(corn: GameObject) {
    if (!this.ghost && corn.detectCollision(this.cursor)) {
      corn.destroyed = true;
      this.canvas.createParticles(corn);

      if (!this.invincible) {
        this.lives = this.lives - 1;
        this.change.detectChanges();
        this.#flash('bg-red-900', 500);
        this.#temporaryImmunity(500);
      }

      if (this.lives === 0) {
        this.#gameOver();
      }
    }
  }

  #flash(color: string, duration: number) {
    const canvasClass = this.canvasEle.nativeElement.classList;

    // Flash Colour
    canvasClass.toggle(color);

    // Remove Colour
    setTimeout(() => {
      canvasClass.toggle(color);
    }, duration);
  }

  #toggleInvincibility() {
    this.cursor.history = [];
    this.cursor.trail = !this.cursor.trail;
    this.invincible = !this.invincible;
  }

  #togglePeaMagnet() {
    this.peaService.peas.forEach((pea) => pea.toggleBehaviour(GameObjectBehaviour.Magnetise));
  }

  #toggleCornRepel() {
    this.cornService.corns.forEach((corn) => corn.toggleBehaviour(GameObjectBehaviour.Repel));
  }

  #temporaryImmunity(duration: number) {
    this.ghost = true;

    setTimeout(() => {
      this.ghost = false;
    }, duration);
  }

  #showMessage(duration: number) {
    const messageClass = document.getElementsByClassName('message')[0].classList;

    // Show Message
    messageClass.toggle('opacity-0');
    // Hide Message
    setTimeout(() => {
      messageClass.toggle('opacity-0');
    }, duration);
  }

  #toggleMenu(hide: boolean) {
    const canvasClass = this.canvasEle.nativeElement.classList;
    const menu = document.getElementsByClassName('menu')[0].classList;

    if (hide) {
      canvasClass.toggle('cursor-none');
      menu.toggle('opacity-0');
      menu.toggle('pointer-events-none');
    } else {
      canvasClass.toggle('cursor-none');
      menu.toggle('opacity-0');
      menu.toggle('pointer-events-none');
    }
  }
}
